import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './schemas/grade.schema';

@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade.name) private readonly gradeModel: Model<Grade>) {}

  create(createGradeDto: CreateGradeDto) {
    return 'This action adds a new grade';
  }

  findAllbyStudentID(id: string) {
    console.log(id )
    return this.gradeModel.find({
      character_id: id,
      
    }).exec();
  }
  findAll(
    findOptions?: FilterQuery<Grade>,
    

  ): Promise<Grade[]>{
    Object.keys(findOptions).forEach(key => findOptions[key] === undefined && delete findOptions[key])
    console.log({...findOptions})
    return this.gradeModel.find({...findOptions}).exec();
    
  }
  findOne(id: number) {
    return `This action returns a #${id} grade`;
  }

  update(id: number, updateGradeDto: UpdateGradeDto) {
    return `This action updates a #${id} grade`;
  }

  remove(id: number) {
    return `This action removes a #${id} grade`;
  }
}
