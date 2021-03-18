import { LogLevel } from '../enum/log-level'

export declare namespace Config {
  interface Service {
    readonly port: number;
    readonly logLevel: LogLevel;
  }
}
