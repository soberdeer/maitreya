import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import { Login } from '@src/components/Login';
import { Meta } from '@src/components/Meta';

export default function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUser = async (userCode: string) => {
    setLoading(true);
    const { user } = await fetch('/api/update-user', {
      method: 'POST',
      body: JSON.stringify({ userCode }),
    })
      .then((res) => res.json())
      .catch(() => ({ user: null }));

    setLoading(false);
    if (user) {
      setCookie('_maitreya_user', user, { maxAge: 60 * 60 * 24 * 31 });
      router.push('/');
    } else {
      setLoginError(true);
    }
  };

  return (
    <>
      <Meta />
      <Login
        updateUser={updateUser}
        error={loginError}
        setError={setLoginError}
        loading={loading}
      />
    </>
  );
}
