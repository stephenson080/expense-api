import {IsNotEmpty} from 'class-validator'
import { Type } from './types'
export class AddReportDTO{
    @IsNotEmpty()
    source: string

    @IsNotEmpty()
    type: Type

    created_at: Date

    updated_at: Date

}