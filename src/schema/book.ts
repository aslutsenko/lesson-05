import * as Yup from 'yup'
import { Book } from '../types/book'

export const schemaBookCreate: Yup.SchemaOf<Book.Create.Body> = Yup.object().shape({
  title: Yup.string().required(),
  year: Yup.number().required()
})
