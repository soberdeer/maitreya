import React, { useEffect, useMemo, useState } from 'react';
import cx from 'clsx';
import {
  StandProps,
  TechnicProps,
  LevelType,
  TechnicStateType,
  AllTechnicStateType,
} from '../../../util/types';
import { Collapse, UnstyledButton } from '@mantine/core';
import { TECHNIC_TYPES } from '../../../util/constants';
import { TextWithIcon } from '../../arwes';
import iconsMap from '../../Technic/icons';
import SmallBlock, { getDisplay } from '../SmallBlock/SmallBlock';
import AnimatedIcon from '../../AnimatedIcon/AnimatedIcon';
import { ChevronDown } from 'react-feather';
import colors from '../../../styles/colors';
import useStyles from './Block.styles';

export interface BlockInterface {
  data: LevelType<StandProps | TechnicProps>;
  type: string;
  filter: AllTechnicStateType;
}

const filterBlock = (data: LevelType<TechnicProps>, filter: AllTechnicStateType) => {
  const filtered = Object.keys(data).reduce((previous, current) => {
    const newData = data[current].map((item) => getDisplay(item, filter));
    if (newData.length === 0 || !newData.find((item) => item === 'block')) {
      return previous;
    }
    return { [current]: newData };
  }, {} as LevelType);
  return Object.keys(filtered).length !== 0;
};

export default function Block({ data, type, filter }: BlockInterface) {
  const classes = useStyles();
  const [opened, setOpened] = useState(type !== 'stand');
  const fullOpen = useMemo(
    () => (type === 'stand' ? true : filterBlock(data, filter)),
    [data, filter]
  );

  useEffect(() => {
    if (fullOpen && type !== 'stand') {
      setOpened(true);
    }
  }, [fullOpen]);

  return (
    <Collapse in={fullOpen}>
      <div className={classes.block}>
        <UnstyledButton className={classes.flex} onClick={() => setOpened(!opened)}>
          <TextWithIcon
            icon={iconsMap[TECHNIC_TYPES[type]]?.icon}
            iconProps={{ size: 30 }}
            as="h2"
            styledFont
            withHover
            palette="secondary"
            mainProps={{ style: { marginBottom: 0 } }}
            style={{ wordBreak: 'break-word', hyphens: 'auto' }}
          >
            {TECHNIC_TYPES[type]}
          </TextWithIcon>

          <AnimatedIcon width={20} height={20}>
            <ChevronDown
              className={cx(classes.chevron, { [classes.rotate]: opened })}
              size={20}
              color={colors.secondary}
            />
          </AnimatedIcon>
        </UnstyledButton>
        <Collapse in={opened}>
          <div className={classes.technicLinks}>
            <SmallBlock data={data.pupil} filter={filter} />
            <SmallBlock data={data.adept} filter={filter} />
            <SmallBlock data={data.master} filter={filter} />
          </div>
        </Collapse>
      </div>
    </Collapse>
  );
}
