import React, { useEffect, useMemo, useState } from 'react';
import { Box, Center, Collapse, Group, UnstyledButton } from '@mantine/core';
import { Loader } from '@src/components/Loader';
import { TypeUsers, UsersTable } from '@src/util/types';
import AddForm from '@src/components/Editor/AddForm/AddForm';
import Ideas from '@src/components/User/components/Ideas';
import ActiveButton from '@src/components/ActiveButton';
import Idea from '@src/components/Editor/Idea/Idea';
import { useRouter } from 'next/router';
import useStyles from './Editor.styles';
import { Text } from '@arwes/react';

type Ideas = {
  introjects: string[];
  convictions: string[];
  credo?: string[];
};

const generateIdeas = (user: TypeUsers): Ideas => ({
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
  const [deleted, setDeleted] = useState<Ideas>(generateFromDb(dbUser, 'removed'));
  const [added, setAdded] = useState<Ideas>(generateFromDb(dbUser, 'added'));
  const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<string | null>(null);

  const deleteIdea = (idea: string, type: keyof Ideas) =>
    setDeleted((prev) => ({
      ...prev,
      [type]: [...prev[type], idea],
    }));

  const revertIdea = (idea: string, type: keyof Ideas) => {
    // const type = getType(idea);
    if (ideas[type].length - deleted[type].length < 5) {
      const clone = [...deleted[type]];
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
      [type]: [...i[type], idea],
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
      .catch((err) => {
        console.log(err);
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
      <div className={cx(classes.loading, { [classes.overlay]: !!state })}>
        {state === 'loading' && <Loader />}
        {state === 'success' && <Text as="h6">Данные успешно записаны</Text>}
        {state === 'error' && (
          <Text as="h6" style={{ color: 'red' }}>
            Произошла ошибка, обратитесь к ближайшему цензору
          </Text>
        )}
      </div>

      <div className={classes.root}>
        <Text as="h6">Дисклеймер</Text>
        <Text as="p">
          {
            'Этот раздел существует для учета идей. Если вы видите отличия с тем, как идеи представлены в вашем профиле, значит, изменения еще находятся в процессе модерации.'
          }
        </Text>
        <div className={classes.group}>
          <Text as="h6">Идеи</Text>
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
          <ActiveButton onClick={submit}>Сохранить</ActiveButton>
        </Center>
      </div>
    </>
  );
}
