import { createUseStyles } from 'react-jss';

type PropsType = { width: number | string; height: number | string };

export default createUseStyles({
  root: {
    minWidth: (props: PropsType) => props.width,
    width: (props: PropsType) => props.width,
    height: (props: PropsType) => props.height || 'auto',
    pointerEvents: 'none',
  },

  wrapper: {
    width: 0,
    height: (props: PropsType) => props.height || 'auto',
    overflow: 'hidden',
    transition: 'width 300ms ease',
  },

  activate: {
    width: (props: PropsType) => [props.width, '!important'],
  },

  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: (props: PropsType) => [props.width, '!important'],
    height: (props: PropsType) => props.height || 'auto',
  },
});
