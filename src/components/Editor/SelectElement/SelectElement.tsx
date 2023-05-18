import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';
import { Box, Group, Input, Popover, Stack, Text, UnstyledButton } from '@mantine/core';
import { ElementTags } from '@src/components/ElementTags';
import useStyles from './SelectElement.styles';

const elements = [
  { value: 'в', label: 'Вода' },
  { value: 'д', label: 'Дерево' },
  { value: 'з', label: 'Земля' },
  { value: 'м', label: 'Металл' },
  { value: 'о', label: 'Огонь' },
];

export function SelectElement({
  onAdd,
  value,
  error,
}: {
  value?: string | null;
  error?: any;
  onAdd(value: string): void;
}) {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <Input.Wrapper className={classes.elementWrapper}>
      <Popover
        shadow="md"
        classNames={{ dropdown: classes.dropdown }}
        opened={opened}
        onChange={setOpened}
      >
        <Popover.Target>
          <Box sx={{ position: 'relative' }}>
            <UnstyledButton
              className={classes.input}
              onClick={() => setOpened((o) => !o)}
              sx={{
                borderColor: error ? 'red !important' : theme.colors.maitreyaSecondary[5],
              }}
            >
              {value && <ElementTags elements={value} />}
            </UnstyledButton>
            <Box
              sx={{
                position: 'absolute',
                pointerEvents: 'none',
                cursor: 'pointer',
                top: 7,
                right: 5,
              }}
            >
              <ChevronDown size={14} />
            </Box>
          </Box>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack spacing={0}>
            {elements.map((item) => (
              <UnstyledButton
                key={item.value}
                onClick={() => {
                  setOpened(false);
                  onAdd(item.value);
                }}
                className={classes.item}
                px="md"
                py="xs"
              >
                <Group spacing="xs">
                  <ElementTags elements={item.value} />
                  <Text className={classes.text}>{item.label}</Text>
                </Group>
              </UnstyledButton>
            ))}
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Input.Wrapper>
  );
}
