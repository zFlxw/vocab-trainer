import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Vocab } from "./Vocab";

@Entity({ name: 'tbl_decks' })
export class Deck {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  created_at!: number;

  @Column()
  updated_at!: number;

  @Column()
  owner_id!: number;

  @Column("simple-json")
  vocabs!: Vocab[];
}