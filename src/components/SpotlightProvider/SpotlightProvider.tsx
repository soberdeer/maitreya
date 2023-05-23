import React, { useEffect, useState } from 'react';
import { NextRouter } from 'next/router';
import { SpotlightProvider as MantineSpotlightProvider, SpotlightAction } from '@mantine/spotlight';
import { useDebouncedValue, useListState } from '@mantine/hooks';
import { SearchIcon } from '@src/components/icons';
import { Loader } from '@src/components/Loader';
import { Action } from './Action';
import useStyles from './SpotlightProvider.styles';

const defaultMessage = 'Информация не найдена';
const loadingMessage = <Loader />;
const errorMessage = 'Ошибка сервера, Цензорат уже в пути';

type EntryMapped = {
  name: string;
  description?: string;
  id: string;
  link?: string;
  group?: string;
};

export default function SpotlightProvider({
  children,
  router,
}: {
  children: React.ReactNode;
  router: NextRouter;
}) {
  const { classes, theme } = useStyles();
  const [query, setQuery] = useState('');
  const [controllers, { append, setState: setControllers }] = useListState<AbortController>([]);
  const [spotlightMessage, setSpotlightMessage] = useState<React.ReactNode | null>(null);
  const [debouncedQuery] = useDebouncedValue(query, 500);
  const [spotlightActions, setSpotlightActions] = useState<SpotlightAction[]>([]);

  const toAction = ({ name, description, id, link, group }: EntryMapped): SpotlightAction => ({
    title: name,
    description,
    group,
    query: query.toLowerCase(),
    onTrigger: () => {
      if (link) {
        router.push(`/${link}/${id}`);
      }
    },
  });

  const toggleSearch = async (signal: AbortSignal) => {
    await fetch('/api/search', {
      method: 'POST',
      body: debouncedQuery.toLowerCase(),
      signal,
    })
      .then((res) => res.json())
      .then(({ entries }: { entries: EntryMapped[] }) => {
        setSpotlightActions(entries.map((r) => toAction(r)));
        setSpotlightMessage(entries.length === 0 ? defaultMessage : null);
        setControllers([]);
      })
      .catch((err) => {
        if (err.message !== 'The user aborted a request.') {
          setSpotlightMessage(errorMessage);
        }
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (debouncedQuery.length > 0) {
      controllers.map((controller) => controller.abort());
      append(abortController);
      toggleSearch(abortController.signal);
    }
  }, [debouncedQuery]);

  useEffect(
    () => () => {
      controllers.map((controller) => controller.abort());
      setControllers([]);
    },
    []
  );

  return (
    <MantineSpotlightProvider
      actions={spotlightActions}
      query={query}
      radius={0}
      cleanQueryOnClose
      actionComponent={Action}
      onQueryChange={(value) => {
        setSpotlightMessage(loadingMessage);
        setQuery(value);
        setSpotlightActions([]);
      }}
      searchIcon={<SearchIcon size="1.2rem" color={theme.colors.maitreya[3]} />}
      searchPlaceholder="Поиск"
      nothingFoundMessage={spotlightMessage}
      shortcut="mod + shift + C"
      classNames={{ ...classes }}
      highlightQuery={false}
    >
      {children}
    </MantineSpotlightProvider>
  );
}
