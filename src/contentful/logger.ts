import pino, { BaseLogger } from 'pino';

const noop = () => {};
const disabledLogger: any = { info: noop, success: noop, error: noop, fatal: noop, warn: noop };

export const Logger: BaseLogger =
  process.env.LOGS === 'on'
    ? pino({
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      })
    : disabledLogger;
