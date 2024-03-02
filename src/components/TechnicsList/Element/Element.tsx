import React, { useMemo } from 'react';
import { Asset } from 'contentful';
import { Group, GroupProps, Stack, UnstyledButton, useMantineTheme } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMediaQuery } from '@mantine/hooks';
import { Animator, Text } from '@arwes/react';
import { TypeStands, TypeCombat, TypeRituals, isTypeStands, isTypeCombat } from '@src/util/types';
import { ChevronDownIcon, LevelIcon, StandardIcon } from '@src/components/icons';
import { ElementTags } from '@src/components/ElementTags';
import { Video } from '@src/components/Video';
import { Anchor } from '../../Anchor/Anchor';

export interface Element extends GroupProps {
  item: TypeStands | TypeCombat | TypeRituals;
}

const keys = {
  warrior: 'воин',
  telepath: 'телепат',
  debuffer: 'боевой телепат',
  healer: 'целитель',
  navigator: 'навигатор',
  shooter: 'стрелок',
};

const standardColors = {
  [keys.warrior]: '#DA77F2',
  [keys.shooter]: '#FF8787',
  [keys.telepath]: '#FFD43B',
  [keys.debuffer]: '#3BC9DB',
  [keys.healer]: '#38D9A9',
  [keys.navigator]: '#4dabf7',
};

export function Element({
  item,
  showDescription,
  ...others
}: Element & { showDescription?: boolean }) {
  const isMobile = useMediaQuery('(max-width: 50em)');
  const theme = useMantineTheme();
  const levelKey = useMemo(
    () =>
      item?.fields?.level === 'Ученик'
        ? 'pupil'
        : item?.fields?.level === 'Адепт'
        ? 'adept'
        : 'master',
    [item]
  );

  const _item = useMemo(() => item as TypeCombat | TypeRituals, [item]);

  const openModal = (content: TypeCombat) => {
    modals.open({
      size: 'xl',
      fullScreen: isMobile,
      styles: {
        content: { backgroundColor: 'transparent' },
        header: { backgroundColor: 'transparent' },
        close: { color: theme.colors.maitreya[3] },
      },
      closeOnEscape: true,
      closeOnClickOutside: true,
      children: <Video {...(content.fields.video as Asset)} title={content.fields.name} />,
    });
  };

  return (
    <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
      <Group spacing={10} position="left" mb={10} noWrap {...others}>
        <LevelIcon level={levelKey} size={30} tooltip={item?.fields?.level} />

        <Anchor href={`/technics/${item.sys.id}`}>
          <Animator merge duration={{ delay: 0.2 }}>
            <Text as="span">{item?.fields?.name as string}</Text>
          </Animator>
        </Anchor>

        {!isTypeStands(item) &&
          _item.fields?.standard
            ?.sort((a, b) => a.localeCompare(b))
            .map((name, index) => (
              <Animator merge duration={{ delay: 0.2 }} key={index}>
                <StandardIcon
                  tooltip={`Имперский Стандарт - ${name}`}
                  size={20}
                  color={standardColors[name?.toLowerCase() as keyof typeof standardColors]}
                />
              </Animator>
            ))}
      </Group>
      {!isTypeStands(item) && showDescription && (
        <Animator merge duration={{ delay: 0 }}>
          <Stack pb={20} pl={42} spacing="xs">
            {(item.fields.will || item.fields.elements) && (
              <Group>
                {item.fields.will && (
                  <Text style={{ marginInlineEnd: 0, marginBlockEnd: 0 }}>
                    {`${item.fields.will} воли`}
                  </Text>
                )}
                {item.fields.elements && <ElementTags elements={item.fields.elements} noWrap />}
              </Group>
            )}
            {isTypeCombat(item) && item.fields.touch && (
              <Text style={{ marginInlineEnd: 0, marginBlockEnd: 0 }}>Касание</Text>
            )}
            {item.fields.effect && (
              <Text style={{ marginInlineEnd: 0, marginBlockEnd: 0 }}>{item.fields.effect}</Text>
            )}
            {item.fields.video && (
              <UnstyledButton onClick={() => openModal(item as TypeCombat)}>
                <Group spacing={0} align="flex-end">
                  <Text
                    style={{
                      marginInlineEnd: 0,
                      marginBlockEnd: 0,
                      color: theme.colors.maitreyaSecondary[4],
                      fontSize: theme.fontSizes.xl,
                    }}
                    data-styled
                  >
                    Видео
                  </Text>
                  <ChevronDownIcon
                    size={20}
                    style={{ transform: 'rotate(-90deg)' }}
                    color={theme.colors.maitreyaSecondary[4]}
                    strokeWidth={2}
                  />
                </Group>
              </UnstyledButton>
            )}
          </Stack>
        </Animator>
      )}
    </Animator>
  );
}
