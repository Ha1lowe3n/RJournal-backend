import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    OneToMany,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { hash } from 'bcrypt';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { PostEntity } from 'src/post/entities/post.entity';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column({ select: false, nullable: true })
    password?: string;

    @Column({ default: 0 })
    carma: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => CommentEntity, (comment) => comment.author)
    comments: CommentEntity[];

    @OneToMany(() => PostEntity, (post) => post.author)
    posts: PostEntity[];

    @ManyToMany(() => PostEntity)
    @JoinTable()
    uppedPosts: PostEntity[];

    @ManyToMany(() => CommentEntity)
    @JoinTable()
    uppedComments: CommentEntity[];

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, 10);
        }
    }
}
