import React, { useState } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useActivate } from '../hooks/use-activate';
import Login from '../components/Login/Login';
import Meta from '../components/Meta/Meta';

export default function LoginPage() {
  const router = useRouter();
  const { activate } = useActivate();
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUser = async (userCode: string) => {
    setLoading(true);
    const { user } = await fetch('/api/update-user', {
      method: 'POST',
      body: JSON.stringify({ userCode }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        return { user: null };
      });

    setLoading(false);
    if (user) {
      document.cookie = `_maitreya_user=${user}; max-age=18144000;`;
      router.push('/');
    } else {
      setLoginError(true);
    }
  };

  return (
    <>
      <Meta />
      <Login
        activate={activate}
        updateUser={updateUser}
        error={loginError}
        setError={setLoginError}
        loading={loading}
      />
    </>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const userId = req?.cookies['_maitreya_user'] || null;

  if (userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
