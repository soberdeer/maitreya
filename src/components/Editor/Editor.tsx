import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Center, Collapse } from '@mantine/core';
import { Animated, Animator, Text } from '@arwes/react';
import { Loader } from '@src/components/Loader';
import { TypeUsers, UsersTable } from '@src/util/types';
import { Ideas } from '@src/components/Ideas';
import { Button } from '@src/components/Button';
import { Error } from '@src/components/Error';
import { AddForm } from './AddForm';
import { Idea } from './Idea';
import useStyles from './Editor.styles';

type MappedIdeasType = {
  introjects: string[];
  convictions: string[];
  credo?: string[];
};

const generateIdeas = (user: TypeUsers): MappedIdeasType => ({
  introjects: (user.fields.introjects as string[]) || [],
  convictions: (user.fields.beliefs as string[]) || [],
  credo: user.fields.creed ? [user.fields.creed as string] : [],
});

const generateFromDb = (dbUser: UsersTable, type: 'added' | 'removed') => {
  const intr = dbUser[`${type}_introjects`];
  const conv = dbUser[`${type}_convictions`];
  return {
    introjects: intr && intr.length > 0 ? intr.split('| ') : [],
    convictions: conv && conv.length > 0 ? conv.split('| ') : [],
  };
};

export function Editor({ user, dbUser }: { user: TypeUsers; dbUser: UsersTable }) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const ideas = useMemo(() => generateIdeas(user), [user, dbUser]);
  const [deleted, setDeleted] = useState<MappedIdeasType>(generateFromDb(dbUser, 'removed'));
  const [added, setAdded] = useState<MappedIdeasType>(generateFromDb(dbUser, 'added'));
  const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<string | null>(null);

  const deleteIdea = (idea: string, type: keyof MappedIdeasType) =>
    setDeleted((prev) => ({
      ...prev,
      [type]: [...prev[type as keyof typeof Ideas], idea],
    }));

  const revertIdea = (idea: string, type: keyof MappedIdeasType) => {
    if (ideas[type] && ideas[type]!.length - deleted[type]!.length < 5) {
      const clone = [...(deleted[type] || [])];
      clone.splice(clone.indexOf(idea), 1);
      setDeleted((prev) => ({
        ...prev,
        [type]: clone,
      }));
    } else {
      setError(
        `Вы не можете вернуть ${
          type === 'introjects' ? 'интроект' : 'убеждение'
        }, так как и максимальное количество.`
      );
    }
  };

  const addIdea = (idea: string, type: string) =>
    setAdded((i) => ({
      ...i,
      [type]: [...(i[type as keyof MappedIdeasType] || []), idea],
    }));

  const mapIdea = (group?: string[], disabled?: boolean) =>
    group
      ?.filter((item) => item?.split('--')?.[1])
      .map((item) => {
        const type = item?.split('--')?.[1]?.trim()?.length === 2 ? 'introjects' : 'convictions';
        const isDeleted = !disabled ? deleted[type]?.indexOf(item) !== -1 : false;
        return (
          <Idea
            key={item}
            item={item}
            isDeleted={isDeleted}
            type={type}
            revertIdea={revertIdea}
            deleteIdea={deleteIdea}
            disabled={disabled}
          />
        );
      }) || [];

  const submit = () => {
    setState('loading');
    fetch('/api/update-db', {
      method: 'POST',
      body: JSON.stringify({
        added,
        deleted,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setState('success');
        setTimeout(() => {
          setState(null);
          router.push('/user');
        }, 2000);
      })
      .catch(() => {
        setState('error');
        setTimeout(() => {
          setState(null);
        }, 2000);
      });
  };

  useEffect(() => {
    setError(null);
  }, [ideas, deleted, added]);

  return (
    <>
      <Animated as="div" className={cx(classes.loading, { [classes.overlay]: !!state })}>
        {state === 'loading' && <Loader />}
        {state === 'success' && <Error type="changeSuccess" />}
        {state === 'error' && <Error type="changeFail" />}
      </Animated>
      <Animator combine duration={{ delay: 0.4, stagger: 0.1 }}>
        <Animated as="div" className={classes.root}>
          <Text as="h3">Дисклеймер</Text>
          <Text as="p">
            Этот раздел существует для учета идей. Если вы видите отличия с тем, как идеи
            представлены в вашем профиле, значит, изменения еще находятся в процессе модерации.
          </Text>
          <div className={classes.group}>
            <Text as="h3">Идеи</Text>
            <div>
              {mapIdea([...ideas.introjects, ...added.introjects])}
              {mapIdea([...ideas.convictions, ...added.convictions])}
              {mapIdea(ideas.credo, true)}
            </div>
          </div>
          <Collapse in={!!error}>
            <Box pt={40}>
              <Text className={classes.error}>{error}</Text>
            </Box>
          </Collapse>

          <AddForm
            introjectsLength={
              ideas.introjects.length + added.introjects.length - deleted.introjects.length
            }
            convictionsLength={
              ideas.convictions.length + added.introjects.length - deleted.convictions.length
            }
            onAdd={addIdea}
          />

          <Center pt={40}>
            <Button onClick={submit}>Сохранить</Button>
          </Center>
        </Animated>
      </Animator>
    </>
  );
}
