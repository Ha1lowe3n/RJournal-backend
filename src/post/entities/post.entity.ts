import { CommentEntity } from 'src/comment/entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column('simple-array')
    tags: string[];

    @Column({ default: 0 })
    carma: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => CommentEntity, (comment) => comment.post)
    comments: CommentEntity[];

    @ManyToOne(() => UserEntity, (user) => user.posts, {
        nullable: false,
    })
    author: UserEntity;
}
