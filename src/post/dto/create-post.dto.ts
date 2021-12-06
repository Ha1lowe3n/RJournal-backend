import { ArrayMinSize, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty({ message: 'Заголовок не может быть пустым' })
    readonly title: string;

    @IsNotEmpty({ message: 'Текст поста не может быть пустым' })
    readonly body: string;

    @ArrayMinSize(1, { message: 'Нужно выбрать тег' })
    @MinLength(1, { each: true, message: 'Тег не может быть пустым' })
    readonly tags: string[];
}
