import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty({ message: 'Заголовок не может быть пустым' })
    readonly title: string;

    @IsNotEmpty({ message: 'Текст поста не может быть пустым' })
    readonly body: string;

    @MinLength(1, { message: 'Нужно выбрать тег' })
    readonly tags: string[];
}
