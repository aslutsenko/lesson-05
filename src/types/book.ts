import { Request as RequestExpress } from 'express'

export declare namespace Book {
  namespace Create {
    interface Body {
      title: string;
      year: number;
    }

    type Request = RequestExpress<null, null, Body>
  }

  namespace Single {
    interface Params {
      id: string;
      [key: string]: string
    }

    type Request = RequestExpress<Params, null, null>
  }
}
