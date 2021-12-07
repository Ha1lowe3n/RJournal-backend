import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post('create')
    async create(@Body() dto: CreatePostDto) {
        return await this.postService.create(dto);
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postService.findOne(+id);
    }

    @Post(':id/up')
    async upCarma(
        @Param('id') postId: string,
        @Body('userId') userId: number,
    ): Promise<PostEntity> {
        return await this.postService.upCarma(+postId, userId);
    }

    @Delete(':id/down')
    async downCarma(
        @Param('id') postId: string,
        @Body('userId') userId: number,
    ): Promise<PostEntity> {
        return await this.postService.downCarma(+postId, userId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postService.update(+id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postService.remove(+id);
    }
}
