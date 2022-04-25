import { Module } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { SchoolsController } from "./schools.controller";
import { School, SchoolSchema } from "./entities/school.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]), UsersModule],
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
