import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty({ message: 'Комментарий не может быть пустым' })
    text: string;

    @IsNotEmpty({ message: 'Не указан postId' })
    postId: number;
}
