import AnimatedIcon from '../../../AnimatedIcon/AnimatedIcon';
import useStyles from './Ring.styles';

export default function Ring({ size = 100, avatar }: { size: number; avatar?: string }) {
  const classes = useStyles();

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      {avatar && (
        <div className={classes.avatarWrapper}>
          <AnimatedIcon width={size / 2.9} height={size / 2.9} className={classes.avatar}>
            <img src={avatar} alt="avatar" width={size / 2.9} style={{ minWidth: size / 2.9 }} />
          </AnimatedIcon>
        </div>
      )}
      <AnimatedIcon width={size} height={size}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1000 1000"
          width={size}
          height={size}
        >
          <circle className={classes.st0} cx="500" cy="500" r="302.8">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 500 500"
              to="360 500 500"
              dur="100s"
              repeatCount="indefinite"
            />
          </circle>
          {/*<circle className={classes.st1} cx="500" cy="500" r="237.7">*/}
          {/*  <animateTransform*/}
          {/*    attributeType="xml"*/}
          {/*    attributeName="transform"*/}
          {/*    type="rotate"*/}
          {/*    from="0 500 500"*/}
          {/*    to="360 500 500"*/}
          {/*    dur="40s"*/}
          {/*    repeatCount="indefinite"*/}
          {/*  />*/}
          {/*</circle>*/}
          <circle className={classes.st2} cx="500" cy="500" r="366.8" transform="rotate(0 500 500)">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 500 500"
              to="-360 500 500"
              dur="50s"
              repeatCount="indefinite"
            />
          </circle>
          <circle className={classes.st3} cx="500" cy="500" r="385.1" />
        </svg>
      </AnimatedIcon>
    </div>
  );
}
