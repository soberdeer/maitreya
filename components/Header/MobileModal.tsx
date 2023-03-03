import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import { closeAllModals } from '@mantine/modals';
import Anchor from '../Anchor/Anchor';
import { useActivate } from '../../hooks/use-activate';
import VkIcon from '../icons/VkIcon';
import AnimatedIcon from '../AnimatedIcon/AnimatedIcon';
import LogoutButton from '../LogoutButton/LogoutButton';
import useStyles from './Header.styles';

export interface MobileModalProps extends React.HTMLProps<HTMLDivElement> {
  anchors: { href: string; children: string }[];
  isGuest: boolean;
  vkUrl?: string;
}

export default function MobileModal({
  children,
  anchors,
  isGuest,
  vkUrl,
  ...others
}: MobileModalProps) {
  const classes = useStyles();
  const [exiting, setExiting] = useState(false);
  const { activate, setActivate } = useActivate(true);

  useEffect(() => {
    if (exiting) {
      setActivate(false);
      setTimeout(() => setExiting(false), 400);
    }
  }, [exiting]);

  return (
    <div {...others}>
      <div className={classes.modalContent}>
        {anchors.map((item, index) => {
          if (item.href === '/user' && isGuest) {
            return null;
          }
          return (
            <Anchor
              key={index}
              animator={{ activate }}
              className={cx(classes.anchor, classes.link)}
              palette="secondary"
              onClick={() => {
                setExiting(true);
                setTimeout(() => closeAllModals(), 300);
                return true;
              }}
              {...item}
            />
          );
        })}
        <LogoutButton onLogout={() => closeAllModals()} direction="top" />
        {vkUrl && (
          <AnimatedIcon width={26} height={26}>
            <Anchor href={vkUrl} target="_blank">
              <VkIcon />
            </Anchor>
          </AnimatedIcon>
        )}
        {children}
      </div>
    </div>
  );
}
