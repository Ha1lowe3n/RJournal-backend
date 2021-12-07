import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepository: Repository<CommentEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
    ) {}

    async create(dto: CreateCommentDto): Promise<CommentEntity> {
        const newComment = new CommentEntity();
        Object.assign(newComment, dto);

        const user = await this.userRepository.findOne({ id: 1 });
        const post = await this.postRepository.findOne({ id: dto.postId });

        newComment.author = user;
        newComment.post = post;

        return await this.commentRepository.save(newComment);
    }

    async findAll(): Promise<CommentEntity[]> {
        return await this.commentRepository.find();
    }

    async findAllOfUser(userId: number) {
        return await this.commentRepository.find();
    }

    async upCarma(commentId: number, userId: number): Promise<CommentEntity> {
        const findComment = await this.commentRepository.findOne(commentId);
        const findUser = await this.userRepository.findOne(userId, {
            relations: ['uppedComments'],
        });

        const uppedCommentIndex = findUser.uppedComments.findIndex(
            (uppedComment) => uppedComment.id === findComment.id,
        );

        if (uppedCommentIndex === -1) {
            findUser.uppedComments.push(findComment);
            findUser.carma++;
            findComment.carma++;
            await this.userRepository.save(findUser);
            await this.commentRepository.save(findComment);
        }

        return findComment;
    }

    async downCarma(commentId: number, userId: number): Promise<CommentEntity> {
        const findComment = await this.commentRepository.findOne(commentId);
        const findUser = await this.userRepository.findOne(userId, {
            relations: ['uppedComments'],
        });

        const uppedCommentIndex = findUser.uppedComments.findIndex(
            (uppedComment) => uppedComment.id === findComment.id,
        );

        if (uppedCommentIndex >= 0) {
            findUser.uppedComments.splice(uppedCommentIndex, 1);
            findUser.carma--;
            findComment.carma--;
            await this.userRepository.save(findUser);
            await this.commentRepository.save(findComment);
        }

        return findComment;
    }

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }

    update(id: number, updateCommentDto: UpdateCommentDto) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}
