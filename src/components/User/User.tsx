import React, { useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Animator, Text } from '@arwes/react';
import { Box, BoxProps, Group } from '@mantine/core';
import { TypeUsers } from '@src/util/types';
import { LogoutButton } from '@src/components/LogoutButton';
import { EditIcon, TableIcon } from '@src/components/icons';
import { RadarProps } from '@src/components/User/components/RadarChart';
import { Ideas } from '@src/components/Ideas';
import { TopPart } from './components/TopPart';
import { BottomPart } from './components/BottomPart';
import { calcHealth } from './calc_health';
import { calcWill } from './calc_will';
import { mapUserFields } from './map-user-fields';
import useStyles from './User.styles';

const Radar = dynamic<RadarProps>(
  () => import('./components/RadarChart').then((mod) => mod.Radar),
  {
    ssr: false,
  }
);

export function User({
  className,
  initialUser,
  isMaster,
  ...others
}: BoxProps & { initialUser: TypeUsers; isMaster: boolean }) {
  const { classes, cx } = useStyles();
  const user = useMemo(() => mapUserFields(initialUser), [initialUser]);
  const will = useMemo(() => calcWill(user), [user]);
  const health = useMemo(() => calcHealth(user), [user]);

  return (
    <Box className={cx(classes.root, className)} {...others}>
      <Animator combine duration={{ delay: 0.4, stagger: 0.1 }}>
        <Box className={classes.logoutWrapper}>
          <Group align="flex-start" spacing="sm">
            {isMaster && (
              <Box pt={0.5}>
                <Link href="/secret">
                  <TableIcon tooltip="Список изменений" size={19} />
                </Link>
              </Box>
            )}

            <Link href="/changes">
              <EditIcon tooltip="Изменить идеи" size={20} />
            </Link>
            <Animator merge>
              <LogoutButton />
            </Animator>
          </Group>
        </Box>
        <TopPart user={user} />

        <Group className={classes.stats} align="flex-start" pt={30}>
          <Ideas introjects={user.introjects} beliefs={user.beliefs} creed={user.creed} />
          {user && (
            <Box>
              <Box>
                {/*@ts-ignore*/}
                <Radar user={user} />
              </Box>
              <div className={classes.mainStats}>
                <Text className={classes.mainStatsText}>{`Жизнь: ${health}`}</Text>
                <Text className={classes.mainStatsText}>{`Воля: ${will}`}</Text>
              </div>
            </Box>
          )}
        </Group>

        <BottomPart user={user} />
      </Animator>
    </Box>
  );
}
