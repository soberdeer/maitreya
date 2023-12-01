import React, { useMemo } from 'react';
import { Animator, Text } from '@arwes/react';
import { Box, Center, Group, Stack } from '@mantine/core';
import { ICONS_MAP, LevelIcon, levelMapper } from '@src/components/icons';
import { ElementTags } from '../ElementTags/ElementTags';
import { RichText } from '../RichText/RichText';
import { Video } from '../Video/Video';
import { TechnicProps } from './map-technic-data';
import useStyles from './Technic.styles';

export function Technic({
  className,
  data,
  stand = false,
  ritual = false,
  ...others
}: Omit<React.HTMLProps<HTMLDivElement>, 'data'> & {
  data: TechnicProps;
  stand: boolean;
  ritual: boolean;
}) {
  const { classes, cx } = useStyles();
  const Icon = useMemo(() => (!ritual && data.type ? ICONS_MAP[data.type] : null), [data]);
  const levelKey = useMemo(
    () => (data.level === 'Ученик' ? 'pupil' : data.level === 'Адепт' ? 'adept' : 'master'),
    [data]
  );

  // console.log(data.video.fields.file?.url)
  return (
    <Animator combine manager="stagger" duration={{ enter: 0.4, exit: 0.4, delay: 0.1 }}>
      <div className={cx(classes.root, className)} {...others}>
        <Group position="left" align="center" noWrap>
          {Icon && <Icon size={40} tooltip={data.type} />}
          <Text as="h2" className={classes.title}>
            {data.name}
          </Text>
        </Group>

        <Group>
          <LevelIcon level={levelKey} size={30} />

          <Text
            className={cx(classes.text, classes.level)}
            style={{ color: levelMapper[levelKey].color }}
            data-styled
          >
            {data.level}
          </Text>
        </Group>

        {!stand && (
          <Stack spacing="xs" sx={{ width: '100%' }}>
            <Group spacing="xs">
              <Text as="span" className={classes.key} data-styled>
                Печати:{' '}
              </Text>
              {data.elements ? (
                <ElementTags elements={data.elements} noWrap />
              ) : (
                <Text as="span">{!data.elements ? 'Не требуются' : ''}</Text>
              )}
            </Group>
            <Group spacing="xs">
              <Text as="span" className={classes.key} data-styled>
                Воля:{' '}
              </Text>
              <Text as="span">{data.will || 'Не требуется'}</Text>
            </Group>
            {!ritual && (
              <>
                <Group spacing="xs">
                  <Text as="span" className={classes.key} data-styled>
                    Воздействие:{' '}
                  </Text>
                  <Text as="span">{data.target || 'Нет'}</Text>
                </Group>
                <Group spacing="xs">
                  <Text as="span" className={classes.key} data-styled>
                    Состояние:{' '}
                  </Text>
                  <Text as="span">{data.state || 'Не определено'}</Text>
                </Group>
                <Group spacing="xs">
                  <Text as="span" className={classes.key} data-styled>
                    Касание:{' '}
                  </Text>
                  <Text as="span">{data.touch ? 'Да' : 'Нет'}</Text>
                </Group>
              </>
            )}
            <>
              {data.effect && (
                <Stack sx={{ width: '100%' }} spacing={0}>
                  <Center>
                    <Text as="h3">Эффект</Text>
                  </Center>
                  <Text as="p">{data.effect}</Text>
                </Stack>
              )}
            </>
          </Stack>
        )}

        {data.description && (
          <Stack sx={{ width: '100%' }} spacing={0}>
            <Center>
              <Text as="h3">Описание</Text>
            </Center>
            <RichText content={data.description} />
          </Stack>
        )}

        {ritual && data.manifest && (
          <Box className={classes.description}>
            <Text as="h3">Пример манифестации</Text>
            <Box>
              <RichText content={data.manifest} />
            </Box>
          </Box>
        )}

        {data.video && (
          <Box>
            <a
              className={classes.link}
              href={`https:${data.video.fields.file?.url as string}`}
              rel="noreferrer"
              target="_blank"
              data-styled
            >
              Открыть в новой вкладке
            </a>
            <Box className={classes.videoContainer} pt={20}>
              <Video
                src={`https:${data.video.fields.file?.url as string}`}
                title={data.video.fields.title as string}
                type={data.video.fields.file?.contentType as string}
              />
            </Box>
          </Box>
        )}
      </div>
    </Animator>
  );
}
