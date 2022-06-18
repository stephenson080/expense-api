import { Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';


@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtTokenService: JwtService){}

    async validateUserCredentials(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        
        if (!user){
            return null
        }

        if (password === user.password){
            const {password, ...result} = user;
            return result;
        }
        return null
    }

    async loginWithCredentials(user: User) {
        const payload = { username: user.username, sub: user.user_id };

        return {
            access_token: this.jwtTokenService.sign(payload, {
                secret: 'SUPERBIGSECRET',
                expiresIn: '3600s'
            }),
        };
    }
}