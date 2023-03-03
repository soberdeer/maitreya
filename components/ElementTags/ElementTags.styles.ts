import { createUseStyles } from 'react-jss';

type PropsType = {
  size: number;
};

export default createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  imageWrapper: {
    borderRadius: '50%',
    overflow: 'hidden',
    width: (props: PropsType) => props.size,
    height: (props: PropsType) => props.size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrapper: {
    width: (props: PropsType) => props.size,
    height: (props: PropsType) => props.size,
  },

  image: {
    width: (props: PropsType) => props.size - 8,
    height: (props: PropsType) => props.size - 8,
  },
});
