import { NextFunction, Request as RequestExpress, Response } from 'express'

export declare namespace App {
  namespace Error {
    interface HttpError {
      readonly message: string;
      readonly status: number;
      readonly timestamp: Date;
      readonly errors: ReadonlyArray<string>;
    }

    interface Body {
      readonly message: string;
      readonly status: number;
      readonly timestamp: string;
      readonly method: string;
      readonly path: string;
      readonly errors: ReadonlyArray<string>;
    }
  }

  type Request = RequestExpress & {
  }

  type Action<T extends Request = Request> = (req: T, res: Response, next: NextFunction) => Promise<void>

  interface Route {
    method: 'get' | 'post';
    path: string;
    action: Action;
  }
}
