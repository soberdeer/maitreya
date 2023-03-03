import React, { useContext, useMemo } from 'react';
import {
  Radar as ReRadar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from 'recharts';
import colors from '../../../../styles/colors';
import ElementsContext from '../../../contexts/ElementsContext';
import { ElementProps } from '../../../../util/types';
import AnimatedIcon from '../../../AnimatedIcon/AnimatedIcon';
import Tick, { TickProps } from './Tick';
import tooltipProps from './TooltipProps';
import useStyles from './Radar.styles';
import mapToInfinity from './mapToInfinity';

export interface RadarProps extends Omit<React.HTMLProps<HTMLDivElement>, 'data'> {
  data: {
    element: string;
    amount: number;
    infinity: boolean;
  }[];
}

export default function Radar({ data, ...others }: RadarProps) {
  const classes = useStyles();
  const { elements }: { elements: ElementProps[] } = useContext(ElementsContext);
  const mappedData = useMemo(() => mapToInfinity(data), [data]);

  return (
    <AnimatedIcon width={300} height={300} {...others}>
      <RadarChart outerRadius={100} width={300} height={317} data={mappedData}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="element"
          className={classes.radar}
          tick={(props: TickProps) => <Tick elements={elements} {...props} />}
        />
        <PolarRadiusAxis angle={90} domain={[0, 4]} fontFamily="Roboto, sans-serif" />
        <ReRadar
          dataKey="amount"
          // stroke="#8884d8"
          fill={colors.primary}
          fillOpacity={0.6}
        />
        <Tooltip {...tooltipProps} />
      </RadarChart>
    </AnimatedIcon>
  );
}
