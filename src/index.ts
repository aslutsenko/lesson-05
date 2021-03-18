import 'reflect-metadata'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { createConnection } from 'typeorm'
import './bootstrap'
import { LogLevel } from './enum/log-level'
import { Service } from './enum/service'
import { BadRequestError } from './error/BadRequestError'
import { NotFoundError } from './error/NotFoundError'
import { Config } from './types/config'
import { Logger } from './types/logger'
import { error } from './utils'

const config = container.resolve<Config.Service>(Service.Config)
const logger = container.resolve<Logger.Service>(Service.Logger)

createConnection().then(async connection => {
  const { Routes } = require('./routes')

  // create express app
  const app = express()
  app.use(bodyParser.json())

  Routes.forEach(route => {
    app[route.method](route.path, async (req: Request, res: Response, next: express.NextFunction) => {
      try {
        await route.action(req, res, next)
      } catch (err) {
        if (err?.name === 'ValidationError') {
          error(new BadRequestError(err?.errors ?? []), req, res)
        } else {
          error(err, req, res)
        }
      }
    })
  })

  app.all('*', (req: Request, res: Response) => {
    error(new NotFoundError(), req, res)
  })

  // start express server
  app.listen(config.port, () => {
    logger.log(LogLevel.Info, `Application running on port: ${config.port}`)
  })

}).catch(error => console.log(error))
