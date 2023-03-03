import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function useActivate(withTimeout?: boolean, timeout?: number) {
  const [activate, setActivate] = useState(false);
  const router = useRouter();

  const routeChangeStart = () => {
    setActivate(false);
  };
  const routeChangeComplete = () => {
    setActivate(true);
  };

  useEffect(() => {
    if (withTimeout) {
      setTimeout(() => setActivate(true), timeout || 200);
    } else {
      setActivate(true);
    }

    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);

    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
      setActivate(false);
    };
  }, []);

  return { activate, setActivate };
}
