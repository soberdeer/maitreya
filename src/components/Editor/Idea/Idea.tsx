import React, { useContext } from 'react';
import cx from 'clsx';
import { RotateCcw, X } from 'react-feather';
import { Box, Center, Group, UnstyledButton } from '@mantine/core';
import PaletteContext from '@/components/contexts/PaletteContext';
import AnimatedIcon from '@/components/AnimatedIcon/AnimatedIcon';
import TextWithElements from '@/components/User/components/Ideas/TextWithElements/TextWithElements';
import useStyles from './Idea.styles';

interface IdeaProps {
  disabled: boolean;
  isDeleted: boolean;
  item: string;
  type: string;
  disableAnimation: any;

  revertIdea(idea: string, type: string);

  deleteIdea(idea: string, type: string);
}

export default function Idea({
  disabled,
  isDeleted,
  revertIdea,
  deleteIdea,
  item,
  type,
  disableAnimation,
}: IdeaProps) {
  const classes = useStyles();
  const { palette } = useContext(PaletteContext);

  return (
    <Group spacing="xl" mb={20} noWrap>
      {!disabled ? (
        <UnstyledButton
          className={cx(classes.deleteButton, {
            // [classes.disabled]: deleted.indexOf(item) !== -1,
          })}
          onClick={() => (isDeleted ? revertIdea(item, type) : deleteIdea(item, type))}
        >
          <AnimatedIcon width={24} height={24} tooltip={isDeleted ? 'Вернуть' : 'Удалить'}>
            <Box
              sx={{
                height: 24,
                width: 24,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {/*<Box sx={{position: 'absolute'}}*/}
              {isDeleted ? (
                <Center sx={{ width: '100%' }}>
                  <RotateCcw size={20} color={palette.primary.main} />
                </Center>
              ) : (
                <X size={24} color="red" />
              )}
            </Box>
          </AnimatedIcon>
        </UnstyledButton>
      ) : (
        <div style={{ width: 24 }} />
      )}
      <Box sx={{ position: 'relative' }}>
        <TextWithElements
          noWrap
          className={classes.idea}
          // textProps={{ className: cx({ [classes.strike]: isDeleted }) }}
          {...disableAnimation}
        >
          {item}
        </TextWithElements>
        <Box
          className={classes.strike}
          sx={{
            opacity: isDeleted ? 1 : 0,
            backgroundColor: palette.primary.main,
          }}
        />
      </Box>
    </Group>
  );
}
