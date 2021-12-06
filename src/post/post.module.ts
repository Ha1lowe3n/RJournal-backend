import { UserEntity } from 'src/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}
