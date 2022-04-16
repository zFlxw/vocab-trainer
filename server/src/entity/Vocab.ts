import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vocab {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  creator_id!: number;

  @Column()
  native_word!: string;

  @Column()
  foreign_word!: string;
}