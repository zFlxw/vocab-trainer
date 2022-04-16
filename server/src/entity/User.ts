import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { Deck } from "./Deck";

@Entity()
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
