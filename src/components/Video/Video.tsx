import React from 'react';
import { Center, CenterProps } from '@mantine/core';

interface VideoProps extends Omit<CenterProps, 'children'> {
  type: string;
  title: string;
  src: string;
}

export function Video({ style, title, src, type, ...others }: VideoProps) {
  return (
    <Center sx={{ width: '100%' }} {...others}>
      <video controls width="100%" title={title}>
        <source src={src} type={type} />
        Браузер не поддерживает видео
      </video>
    </Center>
  );
}
