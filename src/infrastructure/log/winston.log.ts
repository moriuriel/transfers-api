import { createLogger, transports } from 'winston'

export class WinstonLog {
  static newLogger() {
    return createLogger({
      transports: [
        new transports.Console({
          level: 'info',
        }),
      ],
    })
  }
}
