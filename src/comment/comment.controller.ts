import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('create')
    async create(@Body() dto: CreateCommentDto): Promise<CommentEntity> {
        return await this.commentService.create(dto);
    }

    @Get()
    async findAll(): Promise<CommentEntity[]> {
        return await this.commentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto,
    ) {
        return this.commentService.update(+id, updateCommentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentService.remove(+id);
    }
}
