import React, { useEffect, useState } from 'react';
import { Animator, Text } from '@arwes/react';
import { Button } from '@src/components/Button';
import { FrameWrapper } from '@src/components/FrameWrapper';
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

export function Login({ className, children, updateUser, error, setError, loading }: LoginProps) {
  const { classes, cx } = useStyles();
  const [activateInput, setActivateInput] = useState(true);
  const [userCode, setUserCode] = useState<string>('');
  const [errorTerm, setErrorTerm] = useState<string>('');
  const [errorClassName, setErrorClassName] = useState(false);

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

  const onLogin = () => {
    if (error) {
      setErrorClassName(true);
    } else {
      updateUser(userCode);
    }
  };

  useEffect(
    () => () => {
      setErrorTerm('');
      setErrorClassName(false);
    },
    []
  );

  useEffect(() => {
    if (!activateInput) {
      setActivateInput(false);
    }
  }, [activateInput]);

  useEffect(() => {
    if (error) {
      writeError();
      setErrorClassName(true);
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
              <FrameWrapper
                className={cx(classes.frame, className, { [classes.error]: errorClassName })}
                color={errorClassName ? 'red' : 'default'}
              >
                <Stack spacing="xs" align="center" sx={{ width: '100%' }}>
                  <Animator merge>
                    <Text className={classes.title} data-styled>
                      Введите ключ
                    </Text>
                  </Animator>
                  <Box className={classes.inputWrapper}>
                    <TextInput
                      value={userCode}
                      type="password"
                      aria-label="Ключ"
                      onChange={(e) => {
                        setError(false);
                        setErrorClassName(false);
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
                    <Text className={classes.errorText} data-styled>
                      {errorTerm}
                    </Text>
                  </Animator>
                  <Button onClick={onLogin}>Войти</Button>
                  {/*<Button onClick={onGuestLogin} color="maitreya">*/}
                  {/*  Войти как гость*/}
                  {/*</Button>*/}
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
