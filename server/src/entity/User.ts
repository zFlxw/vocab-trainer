import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { Deck } from "./Deck";

@Entity({ name: 'tbl_users' })
export class User {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'json', default: [] })
  decks!: Deck[];
}
