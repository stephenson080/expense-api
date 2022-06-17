import {uuid} from 'uuidv4'
import {Entity, Column,  PrimaryColumn, OneToMany} from 'typeorm'
import { Roles } from 'src/user/types'
import { ReportEntity } from './report.entity'

@Entity()
export class User {
    @PrimaryColumn({
        type: 'uuid',
        default: uuid()
    })
    user_id: string

    @Column({nullable: false})
    username: string

    @Column({nullable: false})
    password: string

    @Column({nullable: false})
    email: string

    @Column({type: 'boolean', default: true})
    isActive: boolean

    @Column({ type: 'enum', default: Roles.USER, enum: Roles})
    role: Roles

    @OneToMany(() => ReportEntity, (report) => report.user)
    reports: ReportEntity[]
}