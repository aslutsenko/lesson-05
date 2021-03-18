import { container, Lifecycle } from 'tsyringe'
import { Service } from './enum/service'
import { ConfigServiceJson } from './service/ConfigServiceJson'
import { LoggerService } from './service/LoggerService'
import { Config } from './types/config'
import { Logger } from './types/logger'

container.register<Config.Service>(Service.Config, { useClass: ConfigServiceJson }, { lifecycle: Lifecycle.Singleton })

container.register<Logger.Service>(Service.Logger, { useClass: LoggerService }, { lifecycle: Lifecycle.Singleton })
