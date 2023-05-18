import React from 'react';
import { Box, Center, Group, UnstyledButton } from '@mantine/core';
import { TextWithElements } from '@src/components/Ideas/TextWithElements';
import { RotateIcon, XIcon } from '@src/components/icons';
import { Tooltip } from '@src/components/Tooltip';
import useStyles from './Idea.styles';

interface IdeaProps {
  disabled?: boolean;
  isDeleted: boolean;
  item: string;
  type: string;
  disableAnimation?: any;

  revertIdea(idea: string, type: string): void;

  deleteIdea(idea: string, type: string): void;
}

export function Idea({
  disabled,
  isDeleted,
  revertIdea,
  deleteIdea,
  item,
  type,
  disableAnimation,
}: IdeaProps) {
  const { classes, cx, theme } = useStyles();

  return (
    <Group spacing="xl" mb={20} noWrap>
      {!disabled ? (
        <UnstyledButton
          className={cx(classes.deleteButton, {
            // [classes.disabled]: deleted.indexOf(item) !== -1,
          })}
          onClick={() => (isDeleted ? revertIdea(item, type) : deleteIdea(item, type))}
        >
          <Tooltip label={isDeleted ? 'Вернуть' : 'Удалить'}>
            <Center sx={{ height: 24, width: 24 }}>
              {isDeleted ? (
                <Center sx={{ width: '100%' }}>
                  <RotateIcon size={20} color={theme.colors.maitreya[3]} />
                </Center>
              ) : (
                <XIcon size={24} color="red" />
              )}
            </Center>
          </Tooltip>
        </UnstyledButton>
      ) : (
        <Box sx={{ width: 24 }} />
      )}
      <Box sx={{ position: 'relative' }}>
        <TextWithElements className={classes.idea} {...disableAnimation}>
          {item}
        </TextWithElements>
        <Box
          className={classes.strike}
          sx={{
            opacity: isDeleted ? 1 : 0,
            backgroundColor: theme.colors.maitreya[3],
          }}
        />
      </Box>
    </Group>
  );
}
