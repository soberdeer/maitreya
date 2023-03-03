import React, { useCallback } from 'react';
import Particle from 'react-tsparticles';
import { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import config from './config.json';

export default function Background() {
  const particlesInit = useCallback(async (engine: Engine) => await loadFull(engine), []);

  return (
    <Particle
      options={config}
      init={particlesInit}
      style={{
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 0,
        opacity: 0.3,
      }}
    />
  );
}
