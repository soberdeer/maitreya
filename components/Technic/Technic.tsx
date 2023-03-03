import React, { useMemo } from 'react';
import cx from 'clsx';
import { Text, TextWithIcon } from '../arwes';
import { StandProps, TechnicProps } from '../../util/types';
import LevelsIcon, { levelMapper } from '../icons/LevelsIcon/LevelsIcon';
import iconsMap from './icons';
import ElementTags from '../ElementTags/ElementTags';
import RichText from '../RichText/RichText';
import Video from '../Video/Video';
import useStyles from './Technic.styles';

export default function Technic({
  className,
  data,
  stand = false,
  ritual = false,
  ...others
}: Omit<React.HTMLProps<HTMLDivElement>, 'data'> & {
  data: TechnicProps | StandProps;
  stand: boolean;
  ritual: boolean;
}) {
  const classes = useStyles();
  const iconObject = useMemo(() => iconsMap[data.type], [data]);
  const levelKey = useMemo(
    () => (data.level === 'Ученик' ? 'pupil' : data.level === 'Адепт' ? 'adept' : 'master'),
    [data]
  );

  return (
    <div className={cx(classes.root, className)} {...others}>
      <TextWithIcon
        as="h1"
        styledFont
        icon={iconObject?.icon}
        iconProps={{ size: 40 }}
        palette="secondary"
        tooltip={data.type}
        className={classes.title}
      >
        {data.name}
      </TextWithIcon>

      <div className={classes.flex}>
        <LevelsIcon level={levelKey} size={30} />
        <Text styledFont style={{ fontSize: 22, color: levelMapper[levelKey].color }}>
          {data.level}
        </Text>
      </div>

      {!stand && (
        <>
          <div className={classes.flex}>
            <Text>
              <span className={classes.key}>Печати: </span>
              <span>{!data.elements ? 'Не требуются' : ''}</span>
            </Text>
            <ElementTags elements={data.elements} />
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

              {data.effect && (
                <div className={classes.description}>
                  <Text as="h3" styledFont palette="secondary">
                    Эффект
                  </Text>
                  <div>
                    <Text>{data.effect}</Text>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {data.description && (
        <div className={classes.description}>
          <Text as="h3" styledFont palette="secondary">
            Описание
          </Text>
          <RichText content={data.description} />
        </div>
      )}

      {data.video && (
        <div className={classes.videoContainer}>
          <Video
            src={data.video.fields.file.url}
            title={data.video.fields.title}
            type={data.video.fields.file.contentType}
          />
        </div>
      )}
    </div>
  );
}
