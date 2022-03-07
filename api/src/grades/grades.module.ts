import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grade, GradeSchema } from './schemas/grade.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Grade.name, schema: GradeSchema}])],
  controllers: [GradesController],
  providers: [GradesService]
})
export class GradesModule {}
