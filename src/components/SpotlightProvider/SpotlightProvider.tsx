import React, { useEffect, useState } from 'react';
import { NextRouter } from 'next/router';
import {
  spotlight,
  SpotlightProvider as MantineSpotlightProvider,
  SpotlightAction,
} from '@mantine/spotlight';
import { useDebouncedValue } from '@mantine/hooks';
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
  const [controller, setController] = useState<AbortController | null>(null);
  const [spotlightMessage, setSpotlightMessage] = useState<React.ReactNode | null>(null);
  const [debouncedQuery] = useDebouncedValue(query, 500);
  const [spotlightActions, setSpotlightActions] = useState<SpotlightAction[]>([]);

  const toAction = ({ name, description, id, link, group }: EntryMapped): SpotlightAction => ({
    id,
    title: name,
    description,
    group,
    keywords: query.toLowerCase(),
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
        const mapped = entries.map((r) => toAction(r));
        spotlight.registerActions(mapped);
        setSpotlightActions(mapped);
        setSpotlightMessage(entries.length === 0 ? defaultMessage : null);
        setController(null);
      })
      .catch((err) => {
        if (err.message !== 'The user aborted a request.') {
          setSpotlightMessage(errorMessage);
        } else {
          setSpotlightMessage(loadingMessage);
        }
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (controller) {
      controller.abort();
    }
    setSpotlightMessage(loadingMessage);
    spotlight.removeActions(spotlightActions.map((a) => a.id as string));
    setController(abortController);
    toggleSearch(abortController.signal);
  }, [debouncedQuery]);

  useEffect(
    () => () => {
      if (controller) {
        controller.abort();
      }
      spotlight.removeActions(spotlightActions.map((a) => a.id as string));
      setSpotlightActions([]);
      setController(null);
    },
    []
  );

  return (
    <MantineSpotlightProvider
      actions={spotlightActions}
      radius={0}
      query={query}
      cleanQueryOnClose
      actionComponent={Action}
      closeOnActionTrigger
      onQueryChange={(value) => {
        setSpotlightMessage(loadingMessage);
        setQuery(value);
        spotlight.removeActions(spotlightActions.map((a) => a.id as string));
        setSpotlightActions([]);
      }}
      searchIcon={<SearchIcon size="1.2rem" color={theme.colors.maitreya[3]} />}
      searchPlaceholder="Поиск"
      nothingFoundMessage={spotlightMessage}
      shortcut="mod + shift + C"
      classNames={{ ...classes }}
      highlightQuery={false}
      limit={50}
    >
      {children}
    </MantineSpotlightProvider>
  );
}
