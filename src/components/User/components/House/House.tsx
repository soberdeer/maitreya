import React, { useMemo } from 'react';
import { Box } from '@mantine/core';
import { Asset } from 'contentful';
import { Tooltip } from '@src/components/Tooltip';
import { aaVisibility, Animated } from '@arwes/react';
import { IconCirclePlus } from '@tabler/icons-react';
import getIconSizes from './getIconSizes';
import useStyles from './House.styles';

const MIN_HEIGHT = 59;
type House = {
  name?: string | undefined;
  type?: 'Великий Дом' | 'Картель' | 'Малый Дом' | 'Орден' | 'Союз' | undefined;
  image?: Asset<'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'> | undefined;
  color?: string[];
  width: number;
  height: number;
};

export function House({ house, homeless }: { house?: House; homeless?: boolean }) {
  const { classes } = useStyles();
  const sizes = useMemo(() => getIconSizes(house?.width, house?.height, homeless), [house]);
  const isSmaller = useMemo(() => sizes.height < MIN_HEIGHT, [sizes]);

  return (
    <Box
      sx={{
        width: sizes.width,
        height: isSmaller ? MIN_HEIGHT : sizes.height,
        paddingTop: isSmaller ? (MIN_HEIGHT - sizes.height) / 2 : 'unset',
      }}
    >
      <Tooltip label={homeless ? 'Нет Дома' : (house?.name as unknown as string) || 'Нет Дома'}>
        <Animated
          animated={aaVisibility()}
          style={{ ...sizes, display: 'flex', alignItems: 'center' }}
        >
          {house && !homeless ? (
            <img
              className={classes.flag}
              src={(house.image as unknown as Asset)?.fields.file?.url as string}
              alt={house.name as unknown as string}
              style={sizes}
            />
          ) : (
            <IconCirclePlus size={50} color="#ededed" />
          )}
        </Animated>
      </Tooltip>
    </Box>
  );
}
