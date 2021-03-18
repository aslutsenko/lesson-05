import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { BookEntity } from "./BookEntity";

@Entity('author')
export class AuthorEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => BookEntity)
  @JoinTable({ name: 'book_author' })
  books: BookEntity[]
}
