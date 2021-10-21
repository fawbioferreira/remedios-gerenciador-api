import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPwdCreate(){
        const saltOrRounds = 10;
        const salt = bcrypt.genSaltSync(saltOrRounds);
        this.password = await bcrypt.hash(this.password, salt);
    }

    @BeforeUpdate()
    async hashPwdUpdate(){
        const saltOrRounds = 10;
        const salt = bcrypt.genSaltSync(saltOrRounds)
        this.password = await bcrypt.hash(this.password, salt);
    }

}