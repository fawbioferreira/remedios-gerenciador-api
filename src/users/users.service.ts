import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepo: Repository<Users>
    ) { }

    findOne(username:string):Promise <Users | undefined>{

        return this.usersRepo.findOne({where: {username}}).catch(
            (error: QueryFailedError) => {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        )

    }

}
