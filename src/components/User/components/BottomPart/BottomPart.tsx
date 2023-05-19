import React, { useMemo } from 'react';
import { TypeRituals, TypeCombat } from '@src/util/types';
import { Text } from '@arwes/react';
import { Box, Group } from '@mantine/core';
import { MappedUser } from '@src/components/User/map-user-fields';
import { LevelIcon } from '@src/components/icons/LevelIcon';
import { Anchor } from '@src/components/Anchor';
import sortSkills, { SortedSkills } from './sortSkills';
import useStyles from './BottomPart.styles';

export function BottomPart({ user }: { user: MappedUser }) {
  const { classes } = useStyles();
  const technics: SortedSkills<TypeCombat> = useMemo(() => sortSkills(user.technics), [user]);
  const rituals: SortedSkills<TypeRituals> = useMemo(() => sortSkills(user.rituals), [user]);

  function mapLink(
    object: SortedSkills<TypeCombat | TypeRituals>,
    key: 'pupil' | 'adept' | 'master'
  ) {
    return object[key].length > 0
      ? object[key].map((item, index: number) => (
          <Anchor key={index} href={`/technics/${item.sys.id}`}>
            <Group mb="md" noWrap>
              <LevelIcon level={key} size={26} />
              <Text className={classes.techName}>{item.fields.name as string}</Text>
            </Group>
          </Anchor>
        ))
      : null;
  }

  return (
    <Box className={classes.root} pb={30} pt={40}>
      {technics && (user.technics?.length || 0) > 0 && (
        <Box className={classes.block}>
          <Text as="h2">Техники</Text>
          <Box className={classes.data}>
            {mapLink(technics, 'pupil')}
            {mapLink(technics, 'adept')}
            {mapLink(technics, 'master')}
          </Box>
        </Box>
      )}

      {rituals && (user.rituals?.length || 0) > 0 && (
        <Box className={classes.block}>
          <Text as="h2">Ритуалы</Text>
          <Box className={classes.data}>
            {mapLink(rituals, 'pupil')}
            {mapLink(rituals, 'adept')}
            {mapLink(rituals, 'master')}
          </Box>
        </Box>
      )}
    </Box>
  );
}
