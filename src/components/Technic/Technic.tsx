import React, { useMemo } from 'react';
import { Text } from '@arwes/react';
import { Center, Group, Stack } from '@mantine/core';
import { LevelIcon, levelMapper } from '@src/components/icons';
import { Tooltip } from '@src/components/Tooltip';
import { ElementTags } from '../ElementTags/ElementTags';
import { RichText } from '../RichText/RichText';
import { Video } from '../Video/Video';
import { TechnicProps } from './map-technic-data';
import { iconsMap } from './icons';
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
  const iconObject = useMemo(() => (!ritual && data.type ? iconsMap[data.type] : null), [data]);
  const Icon = useMemo(() => (iconObject ? iconObject.icon : null), [iconObject]);
  const levelKey = useMemo(
    () => (data.level === 'Ученик' ? 'pupil' : data.level === 'Адепт' ? 'adept' : 'master'),
    [data]
  );

  return (
    <div className={cx(classes.root, className)} {...others}>
      <Group>
        <Tooltip label={data.type}>{Icon && <Icon {...iconObject!.props} />}</Tooltip>
        <Text as="h1">{data.name}</Text>
      </Group>

      <div className={classes.flex}>
        <LevelIcon level={levelKey} size={30} />
        <Text className={classes.text} style={{ fontSize: 22, color: levelMapper[levelKey].color }}>
          {data.level}
        </Text>
      </div>

      {!stand && (
        <Stack spacing="xs" sx={{ width: '100%' }}>
          <div className={classes.flex}>
            <Text>
              <span className={classes.key}>Печати: </span>
              <span>{!data.elements ? 'Не требуются' : ''}</span>
            </Text>
            {data.elements && <ElementTags elements={data.elements} />}
          </div>
          <Text>
            <span className={classes.key}>Воля: </span>
            <span>{data.will || 'Не требуется'}</span>
          </Text>
          {!ritual && (
            <>
              <Text>
                <span className={classes.key}>Воздействие: </span>
                <span>{data.target || 'Нет'}</span>
              </Text>
              <Text>
                <span className={classes.key}>Состояние: </span>
                <span>{data.state || 'Не определено'}</span>
              </Text>
              <Text>
                <span className={classes.key}>Касание: </span>
                <span>{data.touch ? 'Да' : 'Нет'}</span>
              </Text>
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
        <div className={classes.description}>
          <Text as="h3">Пример манифестации</Text>
          <div>
            <RichText content={data.manifest} />
          </div>
        </div>
      )}

      {data.video && (
        <div className={classes.videoContainer}>
          <Video
            src={data.video.fields.file?.url as string}
            title={data.video.fields.title as string}
            type={data.video.fields.file?.contentType as string}
          />
        </div>
      )}
    </div>
  );
}
