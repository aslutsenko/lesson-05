import { injectable } from 'tsyringe'
import { LogLevel } from '../enum/log-level'
import { Config } from '../types/config'

@injectable()
export class ConfigServiceJson implements Config.Service {
  readonly port: number
  readonly logLevel: LogLevel

  constructor () {
    const data = require('../../config/config.json')

    this.port = data.port
    this.logLevel = data.logLevel
  }
}
