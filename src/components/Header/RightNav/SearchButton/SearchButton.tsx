import React, { forwardRef } from 'react';
import { Animated, AnimatedProps } from '@arwes/react';
import { Center, UnstyledButton } from '@mantine/core';
import { Tooltip } from '@src/components/Tooltip';
import { useSpotlight } from '@mantine/spotlight';
import useStyles from './SearchButton.styles';

export const SearchButton = forwardRef<HTMLDivElement, AnimatedProps>(
  ({ className, ...rest }, ref) => {
    const { classes, cx } = useStyles();
    const spotlight = useSpotlight();

    return (
      <Animated className={cx(classes.root, className)} ref={ref} {...rest}>
        <Tooltip label="Поиск">
          <UnstyledButton
            style={{ height: '100%' }}
            onClick={() => spotlight.openSpotlight()}
            aria-label="Поиск"
          >
            <Center sx={{ height: '100%' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                width={24}
                fill="none"
                strokeLinecap="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" className={classes.circle} />
                <path d="M21 21l-6 -6" className={classes.line} />
              </svg>
            </Center>
          </UnstyledButton>
        </Tooltip>
      </Animated>
    );
  }
);
