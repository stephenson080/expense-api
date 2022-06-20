import { Exclude } from 'class-transformer'
import {IsNotEmpty} from 'class-validator'
import { User } from 'src/entities/user.entity'
import { Type } from './types'
export class AddReportDTO{
    @IsNotEmpty()
    source: string

    @IsNotEmpty()
    type: Type

}

export class UpdateReportDTO {
    source: string

    type: Type
}

export class ReponseReportDTO{
    report_id: string
    type: Type

    @Exclude()
    user: User

    created_at: Date

    @Exclude()
    updated_at: Date

    constructor(partial: Partial<any>){
        Object.assign(this, partial)
    }

}