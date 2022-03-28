import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
<<<<<<< HEAD
import { ShopsModule } from './shops/shops.module';
import { ProductsModule } from './products/products.module';
=======
import { AuthModule } from "./auth/auth.module";
>>>>>>> origin/dev

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://client:qqni3XexM5T3E5XQ@cluster0.yfyha.mongodb.net/Game-sense"),
    UsersModule,
<<<<<<< HEAD
    ShopsModule,
    ProductsModule,
=======
    AuthModule,
>>>>>>> origin/dev
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
