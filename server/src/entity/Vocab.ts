import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_vocabs' })
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