import {IsEmail, IsNotEmpty, IsString} from 'class-validator'
import { Roles } from './types'

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    isActive: boolean

    role: Roles
}