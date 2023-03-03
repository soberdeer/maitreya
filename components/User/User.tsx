import React from 'react';
import cx from 'clsx';
import dynamic from 'next/dynamic';
import { Text } from '../arwes';
import { UserProps } from '../../util/types';
import Ideas from './components/Ideas/Ideas';
import TopPart from './components/TopPart/TopPart';
import BottomPart from './components/BottomPart/BottomPart';
import LogoutButton from '../LogoutButton/LogoutButton';
import useStyles from './User.styles';

const Radar = dynamic(() => import('./components/RadarChart/Radar'), {
  ssr: false,
});

export default function User({
  className,
  user,
  ...others
}: React.HTMLProps<HTMLDivElement> & { user: UserProps }) {
  const classes = useStyles();

  return (
    <div className={cx(classes.root, className)} {...others}>
      <div className={classes.logoutWrapper}>
        <LogoutButton direction="top" />
      </div>
      <TopPart user={user} />

      <div className={classes.stats}>
        <Ideas introjects={user.introjects} beliefs={user.beliefs} creed={user.creed} />
        {user.elements && (
          <div style={{ width: 300 }}>
            <div style={{ width: 300, height: 300 }}>
              <Radar data={user.elements} />
            </div>
            <div className={classes.mainStats}>
              <Text style={{ fontSize: 24 }} styledFont>{`Жизнь: ${user.health || 0}`}</Text>
              <Text style={{ fontSize: 24 }} styledFont>{`Воля: ${user.will || 0}`}</Text>
            </div>
          </div>
        )}
      </div>

      <BottomPart user={user} />
    </div>
  );
}
