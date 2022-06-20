import {IsEmail, IsNotEmpty, IsString} from 'class-validator'
import {Exclude} from 'class-transformer'

import {ReportEntity} from '../entities/report.entity'
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

export class UserResponseDTO {
    user_id: string
    username: string
    
    @Exclude()
    password: string

    isActive: string

    email: string

    role: Roles

    reports: ReportEntity[]

    constructor(partial : Partial<any>){
        Object.assign(this, partial)
    }
}