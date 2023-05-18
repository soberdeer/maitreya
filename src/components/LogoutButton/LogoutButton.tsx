import React from 'react';
import { useRouter } from 'next/router';
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
      document.cookie = '_maitreya_user=; expires=Thu,` 01 Jan 1970 00:00:00 UTC; path=/;';
      const chatScript = document.getElementById('chatBroEmbedCode');
      const chatElement = document.getElementsByClassName('chatbro_container')?.[0];
      if (chatScript) {
        chatScript.remove();
      }
      if (chatElement) {
        chatElement.remove();
      }
    }
    router.push('/login');
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
          <LogoutIcon width={iconSize} height={iconSize} color="currentColor" />
        </Center>
      </UnstyledButton>
    </Tooltip>
  );
}
