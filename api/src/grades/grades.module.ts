import { Module } from "@nestjs/common";
import { GradesService } from "./grades.service";
import { GradesController } from "./grades.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Grade, GradeSchema } from "./schemas/grade.schema";
import { CharactersModule } from "src/characters/characters.module";
import { CaslModule } from "src/casl/casl.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Grade.name, schema: GradeSchema }]), CharactersModule, CaslModule],
  controllers: [GradesController],
  providers: [GradesService],
  exports: [GradesService],
})
export class GradesModule {}
