import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dbconfig from '../ormconfig';

@Module({imports: [TypeOrmModule.forRoot(dbconfig)]})
export class DatabaseModule {}
