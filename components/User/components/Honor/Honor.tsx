import React, { useMemo } from 'react';
import cx from 'clsx';
import { Aperture, Chrome, XCircle } from 'react-feather';
import { Text } from '../../../arwes';
import { HonorType } from '../../../../util/types';
import AnimatedIcon from '../../../AnimatedIcon/AnimatedIcon';
import useStyles from './Honor.styles';

type HonorWithIdType = {
  id: HonorType;
  color: string;
  children: React.ReactNode;
};

const AnimatedIconWrapper = (props) => (
  <AnimatedIcon width={30} height={30} style={{ marginBottom: 2 }} {...props} />
);

const honors: HonorWithIdType[] = [
  {
    id: 'Человек Высокой Чести',
    color: '#FFD43B',
    children: (
      <AnimatedIconWrapper>
        <Aperture color="#FFD43B" size={30} />
      </AnimatedIconWrapper>
    ),
  },
  {
    id: 'Человек Чести',
    color: '#F1F3F5',
    children: (
      <AnimatedIconWrapper>
        <Chrome color="#F1F3F5" size={30} />
      </AnimatedIconWrapper>
    ),
  },
  {
    id: 'Человек без Чести',
    color: '#f14b25',
    children: (
      <AnimatedIconWrapper>
        <XCircle color="#f14b25" size={30} />
      </AnimatedIconWrapper>
    ),
  },
];

export default function Honor({
  className,
  honor,
  ...others
}: { honor: string } & React.HTMLProps<HTMLDivElement>) {
  const classes = useStyles();
  const honorItem = useMemo(() => honors.find((item) => honor === item.id), [honor]);

  if (!honorItem) {
    return null;
  }

  return (
    <div className={cx(classes.root, className)} {...others}>
      {honorItem.children}
      <Text className={classes.text} style={{ color: honorItem.color }} styledFont>
        {honor}
      </Text>
    </div>
  );
}
