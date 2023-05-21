import React from 'react';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { Center, UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import { Tooltip } from '@src/components/Tooltip';
import { LogoutIcon } from '@src/components/icons';
import useStyles from './LogoutButton.styles';

export function LogoutButton({
  className,
  iconSize = 20,
  ...rest
}: UnstyledButtonProps & { iconSize?: number }) {
  const { classes, cx } = useStyles();

  const router = useRouter();

  const logout = () => {
    fetch('/api/logout');
    if (document) {
      deleteCookie('_maitreya_user');
      const chatScript = document.getElementById('chatBroEmbedCode');
      const chatElement = document.getElementsByClassName('chatbro_container')?.[0];
      if (chatScript) {
        chatScript.remove();
      }
      if (chatElement) {
        chatElement.remove();
      }
    }
    router.push('/');
  };

  return (
    <Tooltip label="Выйти">
      <UnstyledButton
        className={cx(classes.root, className)}
        {...rest}
        onClick={logout}
        sx={{ width: iconSize, height: iconSize }}
      >
        <Center sx={{ height: '100%' }}>
          <LogoutIcon size={iconSize} color="currentColor" />
        </Center>
      </UnstyledButton>
    </Tooltip>
  );
}
