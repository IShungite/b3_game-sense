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
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { ShopsModule } from "./shops/shops.module";
import { ItemsModule } from "./items/items.module";
import { PromotionsModule } from "./promotions/promotions.module";
import { InventoriesModule } from "./inventories/inventories.module";
import { QuizzesModule } from "./quizzes/quizzes.module";
import { AnswersModule } from "./answers/answers.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://client:qqni3XexM5T3E5XQ@cluster0.yfyha.mongodb.net/Game-sense"),
    UsersModule,
    ShopsModule,
    ProductsModule,
    AuthModule,
    StatisticsModule,
    GradesModule,
    CharactersModule,
    SchoolsModule,
    SubjectsModule,
    CaslModule,
    CategoriesModule,
    ItemsModule,
    PromotionsModule,
    AuthModule,
    CaslModule,
    InventoriesModule,
    QuizzesModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
