import React from 'react';
import { useRouter } from 'next/router';
import { Animator, Text } from '@arwes/react';
import { FrameWrapper } from '@src/components/FrameWrapper';
import { Center, Container } from '@mantine/core';
import { Button } from '@src/components/Button';
import useStyles from './Error.styles';

const errorTypesMap = {
  restricted: 'Доступ запрещен Цензоратом',
  notAllowed: 'Страница не одобрена Цензоратом',
  default: 'Произошла ошибка, цензорат уже в пути',
  notFound: 'Информация не найдена',
  noPerson: 'Цензорат не обладает информацией об этом человеке',
  noChanges: 'Изменений не обнаружено, Цензорат спит спокойно',
  changeSuccess: 'Данные успешно записаны',
  changeFail: 'Произошла ошибка, обратитесь к ближайшему цензору',
};

export function Error({ type }: { type?: keyof typeof errorTypesMap }) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  return (
    <Center sx={{ height: '100%' }} pb={20}>
      <Container size="sm">
        <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
          <FrameWrapper color={type === 'noChanges' || type === 'changeSuccess' ? 'green' : 'red'}>
            <Animator duration={{ delay: 0.4, stagger: 0.1 }}>
              <Text
                as="h2"
                fixed
                className={cx(classes.text, {
                  [classes.green]: type === 'noChanges' || type === 'changeSuccess',
                })}
              >
                {type ? errorTypesMap[type] || errorTypesMap.default : errorTypesMap.default}
              </Text>
            </Animator>
            {type !== 'changeSuccess' && type !== 'changeFail' && (
              <Center>
                <Button
                  onClick={() => router.back()}
                  color={type === 'noChanges' ? 'green' : 'red'}
                >
                  Вернуться
                </Button>
              </Center>
            )}
          </FrameWrapper>
        </Animator>
      </Container>
    </Center>
  );
}
