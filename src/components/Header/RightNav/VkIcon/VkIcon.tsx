import React, { forwardRef } from 'react';
import { Animated, AnimatedProps } from '@arwes/react';
import Link from 'next/link';
import { Center } from '@mantine/core';
import useStyles from './VkIcon.styles';

interface VkIconProps extends AnimatedProps {
  href: string;
  size?: number | string;
}

export const VkIcon = forwardRef<HTMLDivElement, VkIconProps>(
  ({ className, animated, href, size = 24, ...rest }, ref) => {
    const { classes, cx } = useStyles();
    return (
      <Animated className={cx(classes.root, className)} ref={ref} {...rest}>
        <Link href={href} title="Vkontakte" style={{ height: '100%' }} target="_blank">
          <Center sx={{ height: '100%' }}>
            <svg fillRule="evenodd" viewBox="0 0 50.94 31.01" height={size} width={size}>
              <path
                d="M42.64 30.01a2.65 2.65 0 01-1.7-.53 15.46 15.46 0 01-2-2c-.61-.69-1.45-1.62-2.56-2.73h0a20 20 0 00-3.56-2.88 3.61 3.61 0 00-1.85-.6 1.33 1.33 0 00-1.13.36 2.28 2.28 0 00-.31 1.52v4.78c0 .82-.15 1.18-.62 1.5a6.19 6.19 0 01-3.16.54 17.32 17.32 0 01-8.78-2.58 22.83 22.83 0 01-4-3 26.73 26.73 0 01-3.5-4.17h0a64.6 64.6 0 01-5.72-9.59C1.67 6.25.97 3.24.97 2.47a1.35 1.35 0 01.33-1 2 2 0 011.47-.45h5.39a2 2 0 011.48.47h0a3.6 3.6 0 01.85 1.53l.06.17h0a49.78 49.78 0 004.51 9.63h0a25.07 25.07 0 002.26 3.19c.85 1 1.49 1.43 2.09 1.41a1.28 1.28 0 00.51-.1.61.61 0 00.28-.27 3.61 3.61 0 00.25-1.72V7.37a6.87 6.87 0 00-.59-2.53 6.15 6.15 0 00-.89-1.4h0c-.44-.55-.62-.79-.62-1.25a1.13 1.13 0 01.39-.84 1.38 1.38 0 01.94-.34h8.44a1.23 1.23 0 011.14.45h0a2.52 2.52 0 01.31 1.47v10.63a2.8 2.8 0 00.21 1.15.77.77 0 00.69.43 1.82 1.82 0 001.08-.38 10.74 10.74 0 001.42-1.28h0a44.46 44.46 0 006.58-10.85h0V2.5a2.41 2.41 0 01.78-1 2.4 2.4 0 011.64-.5h5.36a3 3 0 01.85.1h0a1.23 1.23 0 01.65.42 1.11 1.11 0 01.2.61h0a2.8 2.8 0 01-.14.7h0c-.19.85-1 2.73-3.58 6.87-1.42 2.25-2.83 4.3-3.56 5.33h0l-.05.08a2.78 2.78 0 00-.52 1.17 1.66 1.66 0 00.38 1.08h0l.14.2a16 16 0 001.57 1.66c.66.64 1.48 1.44 2.1 2.18h0c1.23 1.37 2.19 2.53 2.93 3.53h0a10.15 10.15 0 011.53 2.6h0v.11a2.78 2.78 0 01.12.77 1.34 1.34 0 01-.27.86h0a1.51 1.51 0 01-.76.48 3.54 3.54 0 01-.9.12z"
                className={classes.icon}
              />
            </svg>
          </Center>
        </Link>
      </Animated>
    );
  }
);
