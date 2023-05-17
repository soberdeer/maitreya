import React, { useContext, useMemo } from 'react';
import {
  Radar as ReRadar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from 'recharts';
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

  return (
    <Animator merge>
      <Animated animated={aaVisibility()}>
        <RadarChart outerRadius={100} width={300} height={317} data={elementValues}>
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
      </Animated>
    </Animator>
  );
}
