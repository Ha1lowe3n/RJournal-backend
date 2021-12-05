import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Имя не может быть пустым' })
    @Length(2, 15, {
        message:
            'Имя должно содержать не менее 2 символов, и не более 5 символов',
    })
    readonly fullName: string;

    @IsNotEmpty({ message: 'Email не может быть пустым' })
    @IsEmail(undefined, { message: 'Невалидный Email' })
    readonly email: string;

    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    @Length(6, null, { message: 'Пароль должен содержать не менее 6 символов' })
    readonly password: string;
}
