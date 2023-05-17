import React, { useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Text } from '@arwes/react';
import { TypeUsers } from '@src/util/types';
import { LogoutButton } from '@src/components/LogoutButton';
import { EditIcon, TableIcon } from '@src/components/icons';
import { RadarProps } from '@src/components/User/components/RadarChart';
import { Ideas } from './components/Ideas';
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
}: React.HTMLProps<HTMLDivElement> & { initialUser: TypeUsers; isMaster: boolean }) {
  const { classes, cx } = useStyles();
  const user = useMemo(() => mapUserFields(initialUser), [initialUser]);
  const will = useMemo(() => calcWill(user), [user]);
  const health = useMemo(() => calcHealth(user), [user]);

  return (
    <div className={cx(classes.root, className)} {...others}>
      <div className={classes.logoutWrapper}>
        {isMaster ? (
          <Link href="/secret">
            <TableIcon tooltip="Список изменений" />
          </Link>
        ) : (
          <Link href="/changes">
            <EditIcon tooltip="Изменить идеи" />
          </Link>
        )}
        <LogoutButton />
      </div>
      <TopPart user={user} />

      <div className={classes.stats}>
        <Ideas introjects={user.introjects} beliefs={user.beliefs} creed={user.creed} />
        {user && (
          <div style={{ width: 300 }}>
            <div style={{ width: 300, height: 300 }}>
              {/*@ts-ignore*/}
              <Radar user={user} />
            </div>
            <div className={classes.mainStats}>
              <Text className={classes.mainStatsText}>{`Жизнь: ${health}`}</Text>
              <Text className={classes.mainStatsText}>{`Воля: ${will}`}</Text>
            </div>
          </div>
        )}
      </div>

      <BottomPart user={user} />
    </div>
  );
}
