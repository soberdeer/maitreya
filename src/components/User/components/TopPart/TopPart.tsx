import React from 'react';
import { Animator, Text } from '@arwes/react';
import { Box, Center, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Anchor } from '@src/components/Anchor';
import { FileIcon, StarIcon } from '@src/components/icons';
import { Ring } from '../Ring';
import { House } from '../House';
import { Honor } from '../Honor';
import { Ranking } from '../Ranking';
import { MappedUser } from '../../map-user-fields';
import useStyles from './TopPart.styles';

export function TopPart({ user }: { user: MappedUser }) {
  const { classes, cx } = useStyles({ longName: user.name ? user.name?.length > 20 : false });
  const isSmall = useMediaQuery('(max-width: 400px)');
  const isMedium = useMediaQuery('(max-width: 720px)');

  return (
    <Group
      position="center"
      align="flex-start"
      spacing={20}
      sx={{ width: '100%' }}
      // noWrap={!isMedium}
      // grow
    >
      <Center mt={isSmall ? 50 : 0} sx={{ flexGrow: 1 }}>
        <Animator combine merge manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.1 }}>
          <Ring
            size={isSmall ? 200 : 300}
            avatar={user?.avatar_profile?.fields?.file?.url as string}
            colors={user.order?.fields.color || user.house?.fields.color}
          />
        </Animator>
      </Center>
      <Box
        sx={{
          minWidth: isMedium ? 'unset' : 350,
          flexGrow: 1,
          maxWidth: !isMedium ? 'calc(60% - 1.25rem)' : 'unset',
        }}
      >
        <Box sx={{}}>
          <Group position="left" align="center" spacing={20} pt={isSmall ? 0 : 30} pb={30} noWrap>
            {user.order ? (
              <Animator
                combine
                merge
                manager="stagger"
                duration={{ enter: 0.4, exit: 0.4, delay: 0.1 }}
              >
                <House house={user.order?.fields} homeless={false} />
              </Animator>
            ) : user.house ? (
              <Animator
                combine
                merge
                manager="stagger"
                duration={{ enter: 0.4, exit: 0.4, delay: 0.1 }}
              >
                <House house={user.house?.fields} homeless={user.homeless} />
              </Animator>
            ) : null}
            <Text as="h1" className={classes.name}>
              {user.name}
            </Text>
          </Group>
          {user.honor && (
            <Box className={classes.text} mb={20}>
              <Honor honor={user.honor} />
            </Box>
          )}
          {user.rank_number && user.rank_group && (
            <Box className={cx(classes.text, classes.styled)}>
              <Ranking
                rankGroup={user.rank_group}
                rankNumber={user.rank_number}
                style={{ marginBottom: 20, marginLeft: 0 }}
              />
            </Box>
          )}
          {user.profession && user.work && (
            <Box mb={20}>
              <Text className={cx(classes.text, classes.styled)} style={{ fontSize: 20 }}>
                {user.profession} - {user.work}
              </Text>
            </Box>
          )}
          {user.course && user.cadet_number && (
            <Box mb={20}>
              <Text className={cx(classes.text, classes.styled)} style={{ fontSize: 20 }}>
                {`Номер: ${user.course}-${user.cadet_number}`}
              </Text>
            </Box>
          )}
          {typeof user.rating === 'number' && (
            <Group sx={(theme) => ({ color: theme.colors.maitreya[3] })}>
              <StarIcon tooltip="Личный рейтинг" size={20} />
              <Text className={cx(classes.text, classes.styled)} style={{ fontSize: 24 }}>
                {user.rating}
              </Text>
            </Group>
          )}
          {user.bio && (
            <Anchor href={user.bio} target="_blank" color="maitreyaSecondary" noShadow>
              <Group align="center" spacing={10}>
                <FileIcon size={20} style={{ marginBottom: 3 }} />
                <Text as="span">Биография</Text>
              </Group>
            </Anchor>
          )}
        </Box>
      </Box>
    </Group>
  );
}
