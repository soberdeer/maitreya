import React, { useMemo } from 'react';
import { TypeRituals, TypeCombat, isTypeRituals, isTypeCombat } from '@src/util/types';
import { Text } from '@arwes/react';
import { Box, Collapse, Group, Stack, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MappedUser } from '@src/components/User/map-user-fields';
import { LevelIcon } from '@src/components/icons/LevelIcon';
import { Anchor } from '@src/components/Anchor';
import { ChevronDownIcon, XIcon } from '@src/components/icons';
import { ElementTags } from '@src/components/ElementTags';
import { calcElements } from '@src/components/User/components/RadarChart/calc_elements';
import { isAvailable } from '@src/components/User/components/BottomPart/isAvailable';

import sortSkills, { SortedSkills } from './sortSkills';
import useStyles from './BottomPart.styles';

export function BottomPart({ user }: { user: MappedUser }) {
  const { classes, cx } = useStyles();
  const [showTechnics, { toggle: toggleTechnics }] = useDisclosure(false);
  const [showRituals, { toggle: toggleRituals }] = useDisclosure(false);
  const technics: SortedSkills<TypeCombat> = useMemo(() => sortSkills(user.technics), [user]);
  const rituals: SortedSkills<TypeRituals> = useMemo(() => sortSkills(user.rituals), [user]);
  const elementsAmount = useMemo(() => calcElements(user), [user]);

  function mapLink(
    object: SortedSkills,
    key: 'pupil' | 'adept' | 'master',
    disableCheck?: boolean
  ) {
    return object[key].length > 0
      ? object[key].map((item, index: number) => {
          const available = disableCheck || isAvailable(elementsAmount, item.fields.elements);
          return (
            <Box key={index}>
              <Anchor href={`/technics/${item.sys.id}`}>
                <Group mb="md" noWrap>
                  <LevelIcon level={key} size={26} />
                  <Text className={classes.techName}>{item.fields.name as string}</Text>
                  {!available && <XIcon color="#FF3333" />}
                </Group>
              </Anchor>
              <Collapse in={isTypeRituals(item) ? showRituals : showTechnics}>
                <Stack pb={20} pl={42} spacing="xs">
                  {(item.fields.will || item.fields.elements) && (
                    <Group>
                      {item.fields.will && (
                        <Text style={{ marginInlineEnd: 0, marginBlockEnd: 0 }}>
                          {`${item.fields.will} воли`}
                        </Text>
                      )}
                      {item.fields.elements && (
                        <ElementTags elements={item.fields.elements} noWrap />
                      )}
                    </Group>
                  )}
                  {isTypeCombat(item) && item.fields.touch && (
                    <Text style={{ marginInlineEnd: 0, marginBlockEnd: 0 }}>Касание</Text>
                  )}
                  {item.fields.effect && (
                    <Text style={{ marginInlineEnd: 0, marginBlockEnd: 0 }}>
                      {item.fields.effect}
                    </Text>
                  )}
                </Stack>
              </Collapse>
            </Box>
          );
        })
      : null;
  }

  return (
    <Box className={classes.root} pb={30} pt={40}>
      {technics && (user.technics?.length || 0) > 0 && (
        <Box className={cx(classes.block, { [classes.single]: user.rituals?.length === 0 })}>
          <Group>
            <Text as="h2">Техники</Text>
            <UnstyledButton onClick={toggleTechnics}>
              <ChevronDownIcon rotate={showTechnics} className={classes.chevron} />
            </UnstyledButton>
          </Group>
          <Box className={classes.data}>
            {mapLink(technics, 'pupil')}
            {mapLink(technics, 'adept')}
            {mapLink(technics, 'master')}
          </Box>
        </Box>
      )}

      {rituals && (user.rituals?.length || 0) > 0 && (
        <Box className={cx(classes.block, { [classes.single]: user.rituals?.length === 0 })}>
          <Group>
            <Text as="h2">Ритуалы</Text>
            <UnstyledButton onClick={toggleRituals}>
              <ChevronDownIcon rotate={showRituals} className={classes.chevron} />
            </UnstyledButton>
          </Group>
          <Box className={classes.data}>
            {mapLink(rituals, 'pupil', true)}
            {mapLink(rituals, 'adept', true)}
            {mapLink(rituals, 'master', true)}
          </Box>
        </Box>
      )}
    </Box>
  );
}
