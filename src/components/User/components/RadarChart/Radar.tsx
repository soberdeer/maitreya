import React, { useContext, useMemo } from 'react';
import {
  Radar as ReRadar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from 'recharts';
import { useMediaQuery } from '@mantine/hooks';
import { Center } from '@mantine/core';
import { aaVisibility, Animated, Animator } from '@arwes/react';
import { ElementsContext } from '@src/hooks/use-elements/ElementsContext';
import { MappedUser } from '@src/components/User/map-user-fields';
import Tick, { TickProps } from './Tick';
import { tooltipProps } from './TooltipProps';
import { calcElements } from './calc_elements';
import useStyles from './Radar.styles';

export interface RadarProps {
  user: MappedUser;
}

export function Radar({ user }: RadarProps) {
  const { classes, theme } = useStyles();
  const { elements } = useContext(ElementsContext);
  const elementValues = useMemo(() => calcElements(user), [user]);
  const isSmall = useMediaQuery('(max-width: 400px)');

  return (
    <Animator merge>
      <Animated animated={aaVisibility()}>
        <Center>
          <RadarChart
            outerRadius={isSmall ? 66 : 100}
            width={isSmall ? 240 : 300}
            height={isSmall ? 251 : 317}
            data={elementValues}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="element"
              className={classes.radar}
              tick={(props: TickProps) => <Tick {...props} elements={elements} />}
            />
            <PolarRadiusAxis angle={90} domain={[0, 4]} fontFamily="Roboto, sans-serif" />
            <ReRadar dataKey="amount" fill={theme.colors.maitreya[3]} fillOpacity={0.6} />
            <Tooltip {...tooltipProps} />
          </RadarChart>
        </Center>
      </Animated>
    </Animator>
  );
}
