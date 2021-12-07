import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async create(dto: CreatePostDto): Promise<PostEntity> {
        const newPost = new PostEntity();
        Object.assign(newPost, dto);

        const user = await this.userRepository.findOne({ id: 1 });

        newPost.author = user;

        return await this.postRepository.save(newPost);
    }

    async findAll(): Promise<PostEntity[]> {
        return await this.postRepository.find();
    }

    async findOne(id: number): Promise<PostEntity> {
        const findArticle = await this.postRepository.findOne(id);

        if (!findArticle) {
            throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
        }

        return findArticle;
    }

    async update(id: number, dto: UpdatePostDto): Promise<PostEntity> {
        const findArticle = await this.postRepository.findOne(id);

        if (!findArticle) {
            throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
        }

        Object.assign(findArticle, dto);
        return await this.postRepository.save(findArticle);
    }

    async remove(id: number): Promise<DeleteResult> {
        const findArticle = await this.postRepository.findOne(id);

        if (!findArticle) {
            throw new HttpException('ID is incorrect', HttpStatus.NOT_FOUND);
        }

        return await this.postRepository.delete(id);
    }

    async upCarma(postId: number, userId: number): Promise<PostEntity> {
        const findPost = await this.postRepository.findOne(postId);
        const findUser = await this.userRepository.findOne(userId, {
            relations: ['uppedPosts'],
        });

        const uppedPostIndex = findUser.uppedPosts.findIndex(
            (uppedPost) => uppedPost.id === findPost.id,
        );

        if (uppedPostIndex === -1) {
            findUser.uppedPosts.push(findPost);
            findUser.carma++;
            findPost.carma++;
            await this.userRepository.save(findUser);
            await this.postRepository.save(findPost);
        }

        return findPost;
    }

    async downCarma(postId: number, userId: number): Promise<PostEntity> {
        const findPost = await this.postRepository.findOne(postId);
        const findUser = await this.userRepository.findOne(userId, {
            relations: ['uppedPosts'],
        });

        const uppedPostIndex = findUser.uppedPosts.findIndex(
            (uppedPost) => uppedPost.id === findPost.id,
        );

        if (uppedPostIndex >= 0) {
            findUser.uppedPosts.splice(uppedPostIndex, 1);
            findUser.carma--;
            findPost.carma--;
            await this.userRepository.save(findUser);
            await this.postRepository.save(findPost);
        }

        return findPost;
    }
}
