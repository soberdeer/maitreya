import React from 'react';
import { Text } from '@arwes/react';
import { Box, Group } from '@mantine/core';
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

  return (
    <div className={classes.root}>
      <Ring size={300} avatar={user?.avatar_profile?.fields?.file?.url as string} />
      <div>
        <Text as="h1" className={classes.name}>
          <div className={classes.flex} style={{ alignItems: 'flex-start' }}>
            {user.order && <House house={user.order?.fields} homeless={false} />}
            {user.house && <House house={user.house?.fields} homeless={user.homeless} />}
            <span>{user.name}</span>
          </div>
        </Text>
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
        {user.rating && (
          <Group sx={(theme) => ({ color: theme.colors.maitreya[3] })}>
            <StarIcon tooltip="Личный рейтинг" size={20} />
            <Text className={cx(classes.text, classes.styled)} style={{fontSize: 24}}>{user.rating}</Text>
          </Group>
        )}
        {user.bio && (
          <div style={{ display: 'flex' }}>
            <Anchor href={user.bio} target="_blank">
              <Group>
                <FileIcon size={20} />
                <Text as="span">Биография</Text>
              </Group>
            </Anchor>
          </div>
        )}
      </div>
    </div>
  );
}
