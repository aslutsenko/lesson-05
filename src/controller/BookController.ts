import { Request } from "express";
import { getRepository } from "typeorm";
import { BookEntity } from "../entity/BookEntity";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { schemaBookCreate } from "../schema/book";
import { App } from "../types/app";
import { Book } from '../types/book'

const repository = getRepository(BookEntity)

export const bookGetAll: App.Action = async (req, res) => {
  const books = await repository.find({ relations: ['authors'] })
  res.json(books)
}

export const bookGetById: App.Action<Book.Single.Request> = async (req, res) => {
  const book = await repository.findOne(req.params.id, { relations: ['authors'] })

  if (!book) {
    throw new NotFoundError()
  }

  res.json(book)
}

export const bookCreate: App.Action<Book.Create.Request> = async (req, res) => {
  await schemaBookCreate.validate(req.body, { abortEarly: false })
  const book = await repository.save(req.body)
  res.status(201).json(book)
}
