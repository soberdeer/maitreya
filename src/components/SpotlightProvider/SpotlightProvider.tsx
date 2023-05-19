import React, { useEffect, useState } from 'react';
import { NextRouter } from 'next/router';
import { SpotlightProvider as MantineSpotlightProvider, SpotlightAction } from '@mantine/spotlight';
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
  const [spotlightMessage, setSpotlightMessage] = useState<React.ReactNode | null>(null);
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [spotlightActions, setSpotlightActions] = useState<SpotlightAction[]>([]);

  const toAction = ({ name, description, id, link, group }: EntryMapped): SpotlightAction => ({
    title: name,
    description,
    group,
    query,
    onTrigger: () => {
      if (link) {
        router.push(`/${link}/${id}`);
      }
    },
  });

  const toggleSearch = async () => {
    await fetch('/api/search', { method: 'POST', body: debouncedQuery })
      .then((res) => res.json())
      .then(({ entries }: { entries: EntryMapped[] }) => {
        setSpotlightMessage(entries.length === 0 ? defaultMessage : null);
        setSpotlightActions(entries.map((r) => toAction(r)));
      })
      .catch(() => setSpotlightMessage(errorMessage));
  };

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      toggleSearch();
    }
  }, [debouncedQuery]);

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
    >
      {children}
    </MantineSpotlightProvider>
  );
}
