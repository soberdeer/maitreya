import React from 'react';
import { Center, CenterProps } from '@mantine/core';

interface VideoProps extends Omit<CenterProps, 'children'> {
  type?: string;
  title?: string;
  src?: string;
}

export function Video({ style, title, src, type, ...others }: VideoProps) {
  if (!src) {
    return null;
  }
  return (
    <Center
      sx={{ width: '100%' }}
      {...others}
      // dangerouslySetInnerHTML={{
      //   __html: `<video controls width="100%" title="${title}">
      //   <source src="${src}?origin=https://maitreya-academy.vercel.app/" type="${type}" />
      //   Браузер не поддерживает видео
      // </video>`,
      // }}
    >
      <video controls width="100%" title={title} playsInline>
        <source src={`${src}?origin=https://maitreya-academy.vercel.app/`} type="video/mp4" />
        Браузер не поддерживает видео
      </video>
    </Center>
  );
}
