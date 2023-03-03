import React, { useMemo } from 'react';
import { HouseType } from '../../../../util/types';
import { HelpCircle } from 'react-feather';
import AnimatedIcon from '../../../AnimatedIcon/AnimatedIcon';
import getIconSizes from './getIconSizes';
import Tooltip from '../../../Tooltip/Tooltip';
import useStyles from './House.styles';

const MIN_HEIGHT = 59;

export default function House({ house, homeless }: { house?: HouseType; homeless?: boolean }) {
  const classes = useStyles();
  const sizes = useMemo(() => getIconSizes(house?.width, house?.height, homeless), [house]);
  const isSmaller = useMemo(() => sizes.height < MIN_HEIGHT, [sizes]);

  return (
    <div
      style={{
        width: sizes.width,
        height: isSmaller ? MIN_HEIGHT : sizes.height,
        paddingTop: isSmaller ? (MIN_HEIGHT - sizes.height) / 2 : 'unset',
      }}
    >
      <Tooltip content={homeless ? 'Нет Дома' : house?.name || 'Нет Дома'}>
        <AnimatedIcon {...sizes}>
          <div style={{ ...sizes, display: 'flex', alignItems: 'center' }}>
            {house && !homeless ? (
              <img
                className={classes.flag}
                src={house.image.fields.file.url}
                alt={house.name}
                style={sizes}
              />
            ) : (
              <HelpCircle size={50} color="#ededed" />
            )}
          </div>
        </AnimatedIcon>
      </Tooltip>
    </div>
  );
}
