import { Module } from "@nestjs/common";
import { SubjectsService } from "./subjects.service";
import { SubjectsController } from "./subjects.controller";
import { Subject, SubjectSchema } from "./entities/subject.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { CharactersModule } from "src/characters/characters.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]), CharactersModule],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}
