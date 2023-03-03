import colors from '../../../../styles/colors';

const tooltipProps = {
  wrapperStyle: {
    border: 'none',
    outline: 'none',

    '&:hover, &:active': {
      outline: 'none',
    },
  },
  contentStyle: {
    backgroundColor: 'rgba(0,64,64,0.8)',
    border: `1px solid ${colors.primary}`,
    fontFamily: 'Roboto, sans-serif !important',
    outline: 'none',

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

export default tooltipProps;
