import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { StatisticsModule } from "./statistics/statistics.module";
import { GradesModule } from './grades/grades.module';
import { CharactersModule } from './characters/characters.module';
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://client:qqni3XexM5T3E5XQ@cluster0.yfyha.mongodb.net/Game-sense"),
    UsersModule,
    StatisticsModule,
    GradesModule,
    CharactersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
