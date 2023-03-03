import React from 'react';
import { useRouter } from 'next/router';
import { LogOut } from 'react-feather';
import AnimatedIcon from '../AnimatedIcon/AnimatedIcon';
import useStyles from './LogoutButton.styles';

export default function LogoutButton({
  onLogout,
  direction,
}: {
  onLogout?(): void;
  direction?: string;
}) {
  const classes = useStyles();
  const router = useRouter();

  const logout = () => {
    if (document) {
      document.cookie = '_maitreya_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      const chatScript = document.getElementById('chatBroEmbedCode');
      const chatElement = document.getElementsByClassName('chatbro_container')?.[0];
      if (chatScript) {
        chatScript.remove();
      }
      if (chatElement) {
        chatElement.remove();
      }
    }
    if (onLogout) {
      onLogout();
    }
    router.push('/login');
  };

  return (
    <button type="button" className={classes.root} onClick={logout}>
      <AnimatedIcon width={20} height={20} tooltip="Выйти" direction={direction || 'bottom'}>
        <LogOut size={20} />
      </AnimatedIcon>
    </button>
  );
}
