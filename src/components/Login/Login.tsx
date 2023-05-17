import React, { useEffect, useState } from 'react';
import { Animator, Text } from '@arwes/react';
import { Button } from '@src/components/Button';
import { FrameWrapper } from '@src/components/FrameWrapper';
// import { FrameCorners, Text, FrameBox } from '../arwes';
import { Loader } from '@src/components/Loader';
import { Box, Center, Container, Stack } from '@mantine/core';
import { TextInput } from '@src/components/TextInput';
import useStyles from './Login.styles';

export interface LoginProps extends React.HTMLProps<HTMLDivElement> {
  error: boolean;
  loading: boolean;
  updateUser: (cookie: string) => void;
  setError: (state: boolean) => void;
}

const errorMessage = 'Пользователь не найден'.split('');

export function Login({
  className,
  children,
  updateUser,
  error,
  setError,
  loading,
  ...others
}: LoginProps) {
  const { classes, cx } = useStyles();
  const [activateInput, setActivateInput] = useState(true);
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

  useEffect(() => () => {
      setErrorTerm('');
    }, []);

  useEffect(() => {
    if (!activateInput) {
      setActivateInput(false);
    }
  }, [activateInput]);

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
    <>
      <div className={cx(classes.loading, { [classes.showLoading]: loading })}>
        <Loader />
      </div>
      <Center sx={{ height: '100%' }} pb={20}>
        <Container size="md">
          <Box sx={{ width: '100%', minWidth: 325 }}>
            <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
              <FrameWrapper className={cx(classes.frame, className)}>
                <Stack spacing="xs" align="center" sx={{ width: '100%' }}>
                  <Animator merge>
                    <Text className={classes.title}>Введите ключ</Text>
                  </Animator>
                  <Box className={classes.inputWrapper}>
                    <TextInput
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
                  </Box>
                  <Animator combine active={!!errorTerm} duration={{ enter: 0.2, exit: 0.2 }}>
                    <Text className={classes.errorText}>{errorTerm}</Text>
                  </Animator>
                  <Button onClick={onLogin}>Войти</Button>
                  <Button onClick={onGuestLogin} color="maitreya">
                    Войти как гость
                  </Button>
                  {children}
                </Stack>
              </FrameWrapper>
            </Animator>
          </Box>
        </Container>
      </Center>
    </>
  );
}
