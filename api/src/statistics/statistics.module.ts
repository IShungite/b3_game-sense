import { Module } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { StatisticsController } from "./statistics.controller";
import { GradesModule } from "src/grades/grades.module";
import { SubjectsModule } from "src/subjects/subjects.module";

@Module({
  imports: [GradesModule, SubjectsModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
