import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import { Button, LoadingBars } from '@arwes/core';
import { FrameCorners, Text, FrameBox } from '../arwes';
import { useActivate } from '../../hooks/use-activate';
import FrameWrapper from '../FrameWrapper/FrameWrapper';
import useStyles from './Login.styles';

export interface LoginProps extends React.HTMLProps<HTMLDivElement> {
  error: boolean;
  activate: boolean;
  loading: boolean;
  updateUser: (cookie: string) => void;
  setError: (state: boolean) => void;
}

const errorMessage = 'Пользователь не найден'.split('');

export default function Login({
  className,
  children,
  updateUser,
  error,
  setError,
  activate,
  loading,
  ...others
}: LoginProps) {
  const classes = useStyles();
  const { activate: activateInput, setActivate: setActivateInput } = useActivate(true);
  const [userCode, setUserCode] = useState<string>('');
  const [palette, setPalette] = useState<'primary' | 'error'>('primary');
  const [errorTerm, setErrorTerm] = useState<string>('');

  const writeError = () => {
    const timeout = setTimeout(() => {
      if (errorTerm?.length !== errorMessage.length) {
        setErrorTerm(`${errorTerm}${errorMessage[errorTerm?.length]}`);
      }
    }, 0);
    return () => clearTimeout(timeout);
  };

  const removeError = () => {
    const timeout = setTimeout(() => {
      if (errorTerm?.length !== 0) {
        setErrorTerm(errorTerm.slice(0, -1));
      }
    }, 0);
    return () => clearTimeout(timeout);
  };

  const updatePalette = () => {
    if (error) {
      setPalette('error');
      setTimeout(() => setPalette('primary'), 100);
    }
  };

  const onLogin = () => {
    if (error) {
      updatePalette();
    } else {
      updateUser(userCode);
    }
  };

  const onGuestLogin = () => updateUser('guest');

  useEffect(() => {
    return () => {
      setErrorTerm('');
    };
  }, []);

  useEffect(() => {
    if (!activate) {
      setActivateInput(false);
    }
  }, [activate]);

  useEffect(() => {
    updatePalette();
  }, [error]);

  useEffect(() => {
    if (error) {
      writeError();
    } else {
      removeError();
    }
  }, [error, errorTerm]);

  return (
    <FrameWrapper
      flex
      autoWidth
      noHeader
      component={FrameCorners}
      className={className}
      animator={{ activate, manager: 'parallel' }}
      style={{ marginBottom: 0, marginTop: 0, position: 'relative' }}
      {...others}
    >
      {loading && (
        <div className={classes.loading}>
          <LoadingBars animator={{ animate: false }} />
        </div>
      )}
      <div className={classes.content}>
        <Text palette={palette} styledFont style={{ fontSize: 24 }}>
          Введите ключ
        </Text>
        <input
          className={cx(classes.input, {
            [classes.showInput]: activateInput,
          })}
          style={{ marginTop: 50 }}
          value={userCode}
          type="password"
          onChange={(e) => {
            setError(false);
            setUserCode(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
              onLogin();
            }
          }}
        />
        <Text palette={palette} animate={false} styledFont>
          {errorTerm}
        </Text>
        <div className={classes.buttons}>
          <Button
            animator={{ activate }}
            palette={palette}
            FrameComponent={FrameBox}
            onClick={onLogin}
          >
            <Text palette={palette} styledFont>
              Войти
            </Text>
          </Button>
          <Button
            animator={{ activate }}
            palette={palette}
            FrameComponent={FrameBox}
            onClick={onGuestLogin}
          >
            <Text palette={palette} styledFont>
              Войти как гость
            </Text>
          </Button>
        </div>
        {children}
      </div>
    </FrameWrapper>
  );
}
