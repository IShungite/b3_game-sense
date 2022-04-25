import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

import { StatisticsModule } from "./statistics/statistics.module";
import { GradesModule } from "./grades/grades.module";
import { CharactersModule } from "./characters/characters.module";
import { SchoolsModule } from "./schools/schools.module";
import { SubjectsModule } from "./subjects/subjects.module";
import { CaslModule } from "./casl/casl.module";
import { PromotionsModule } from "./promotions/promotions.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://client:qqni3XexM5T3E5XQ@cluster0.yfyha.mongodb.net/Game-sense"),
    UsersModule,
    AuthModule,
    StatisticsModule,
    GradesModule,
    CharactersModule,
    SchoolsModule,
    SubjectsModule,
    CaslModule,
    PromotionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
