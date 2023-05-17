import { TooltipProps } from 'recharts';

export const tooltipProps: TooltipProps<string, string> = {
  wrapperStyle: {
    border: 'none',
    outline: 'none',

    // @ts-ignore
    '&:hover, &:active': {
      outline: 'none',
    },
  },
  contentStyle: {
    backgroundColor: 'rgba(0,64,64,0.8)',
    border: '1px solid #4dffff',
    fontFamily: 'Roboto, sans-serif !important',
    outline: 'none',
    // @ts-ignore
    '&:hover, &:active': {
      outline: 'none',
    },
  },
  labelStyle: {
    display: 'none',
  },
  itemStyle: {
    outline: 'none',
    textTransform: 'capitalize',
    fontFamily: 'Roboto, sans-serif',
  },
  separator: ': ',
  allowEscapeViewBox: { x: false, y: false },
  formatter: (value, name, props) => [props.payload.infinity ? '∞' : value, props.payload.element],
};
