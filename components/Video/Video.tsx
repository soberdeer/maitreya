import React from 'react';

export default function Video({
  style,
  title,
  src,
  type,
  ...others
}: Omit<React.HTMLProps<HTMLDivElement>, 'type'> & { type: string }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      {...others}
    >
      <video controls width="100%" title={title}>
        <source src={src} type={type} />
        Браузер не поддерживает видео
      </video>
    </div>
  );
}
