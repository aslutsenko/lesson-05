import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { AuthorEntity } from "./AuthorEntity";

@Entity('book')
export class BookEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @ManyToMany(() => AuthorEntity)
  @JoinTable({ name: 'book_author' })
  authors: AuthorEntity[]
}
