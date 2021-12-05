import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormconfig from './ormconfig';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig), UserModule, PostModule],
})
export class AppModule {}
