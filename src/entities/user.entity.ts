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

    @Column({nullable: false, unique: true})
    username: string

    @Column({nullable: false})
    password: string

    @Column({nullable: false, unique: true})
    email: string

    @Column({type: 'boolean', default: true})
    isActive: boolean

    @Column({ type: 'character varying', default: Roles.USER, enum: Roles})
    roles: Roles

    @OneToMany(() => ReportEntity, (report) => report.user)
    reports: ReportEntity[]
}