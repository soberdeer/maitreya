import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Center } from '@mantine/core';
import { Animator, Text } from '@arwes/react';
import { UsersTable } from '@src/util/types';
import { Button } from '@src/components/Button';
import { Loader } from '@src/components/Loader';
import { CheckIcon } from '@src/components/icons';
import { Error } from '@src/components/Error';
import { UserCollapse } from './UserCollapse';
import { Checkbox } from './Checkbox';
import useStyles from './SecretTable.styles';

interface ChangesTableProps {
  users: UsersTable[];
}

const generateInit = (users: UsersTable[], state?: boolean) =>
  users.reduce(
    (prev, current) => ({
      ...prev,
      [current.user_id]: state || false,
    }),
    {},
  );

export function SecretTable({ users: initUsers }: ChangesTableProps) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [users, setUsers] = useState(initUsers);
  const [show, setShow] = useState<Record<string, boolean>>(generateInit(users));
  const [selected, setSelected] = useState<Record<string, boolean>>(generateInit(users));
  const [state, setState] = useState<string | null>(null);

  const deleteSelected = () => {
    setState('loading');
    fetch('/api/clean-db', {
      method: 'POST',
      body: JSON.stringify({
        users: Object.keys(selected)
          .map((key) => (selected[key] ? key : null))
          .filter((k) => !!k),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setState('success');
        setTimeout(() => {
          setState(null);
          const isZero = Object.keys(selected).length === users.length;
          const removed = Object.keys(selected)
            .map((key) => (selected[key] ? key : null))
            .filter((k) => !!k);
          const newUsers = users.filter((u) => !removed.includes(u.user_id));
          setUsers(newUsers);
          setSelected(generateInit(newUsers));
          setShow(generateInit(newUsers));
          if (isZero) {
            router.push('/user');
          }
        }, 2000);
      })
      .catch(() => {
        // console.log(err);
        setState('error');
        setTimeout(() => {
          setState(null);
        }, 2000);
      });
  };

  return (
    <>
      <Animator combine duration={{ delay: 0.4, stagger: 0.1 }}>
        <Box className={cx(classes.loading, { [classes.overlay]: !!state })}>
          {state === 'loading' && <Loader />}
          {state === 'success' && <Error type="changeSuccess" />}
          {state === 'error' && <Error type="changeFail" />}
        </Box>
        <Box className={classes.root}>
          <Text as="h3">Учет и расход</Text>
          <Checkbox
            label={
              <Text as="span" className={classes.checkboxLabel}>
                Выбрать все
              </Text>
            }
            checked={
              Object.keys(selected)
                .map((key) => selected[key])
                .indexOf(false) === -1
            }
            onChange={() =>
              setSelected(
                generateInit(
                  users,
                  !(
                    Object.keys(selected)
                      .map((key) => selected[key])
                      .indexOf(false) === -1
                  ) as boolean,
                ),
              )}
            mb={30}
          />
          {users.map((u) => (
            <UserCollapse
              user={u}
              key={u.user_id}
              show={show[u.user_id]}
              selected={selected[u.user_id]}
              setShow={(st) => setShow((prev) => ({ ...prev, [u.user_id]: st }))}
              setSelect={(st) => setSelected((prev) => ({ ...prev, [u.user_id]: st }))}
            />
          ))}
          <Center pt={50}>
            {/*@ts-ignore*/}
            <Button onClick={deleteSelected} leftIcon={CheckIcon}>
              Убрать выбранные из модерации
            </Button>
          </Center>
        </Box>
      </Animator>
    </>
  );
}
