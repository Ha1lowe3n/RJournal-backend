import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Entity,
} from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.comments, {
        nullable: false,
    })
    author: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.comments, {
        nullable: false,
    })
    post: PostEntity;
}
