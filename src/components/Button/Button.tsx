import React from 'react';
import { Animator, Text } from '@arwes/react';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { Center, Container } from '@mantine/core';
import useStyles from './Error.styles';

const errorTypesMap = {
  restricted: 'Доступ запрещен Цензоратом',
  notAllowed: 'Страница не одобрена Цензоратом',
  default: 'Произошла ошибка, цензорат уже в пути',
};

export function Button({ type }: { type?: keyof typeof errorTypesMap }) {
  const { classes } = useStyles();
  return (
    <Container size="sm">
      <Center sx={{ height: '100vh' }}>
        <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
          <FrameWrapper color="red">
            <Animator duration={{ delay: 0.4, stagger: 0.1 }}>
              <Text as="h2" fixed className={classes.text}>
                {type ? errorTypesMap[type] || errorTypesMap.default : errorTypesMap.default}
              </Text>
            </Animator>
          </FrameWrapper>
        </Animator>
      </Center>
    </Container>
  );
}
