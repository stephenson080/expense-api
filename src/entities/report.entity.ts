import {Entity, Column,  PrimaryColumn, ManyToOne} from 'typeorm'
import { Type } from '../report/types'
import {uuid} from 'uuidv4'
import { User } from './user.entity'



@Entity('report')
export class ReportEntity {
    @PrimaryColumn({
        type: 'uuid',
        
        default: uuid()
    })
    report_id: string

    @Column({nullable: false, name: 'source'})
    source: string

    @Column({type: 'enum',enum : Type, nullable: false, name: 'type'})
    type: Type
    @Column({type: 'timestamp', default: new Date(), name: 'created_at'})
    created_at: Date

    @Column({type: 'timestamp', default: new Date(), name: 'updated_at'})
    updated_at: Date
    @ManyToOne(() => User, (user) => user.reports)
    user: User
}
