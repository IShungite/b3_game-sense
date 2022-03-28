import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUserRequest } from "src/auth/models/auth.models";
import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { School } from "./entities/school.schema";

@Injectable()
export class SchoolsService {
  constructor(@InjectModel(School.name) private readonly schoolModel: Model<School>) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const schoolExists = await this.schoolModel.findOne({ name: createSchoolDto.name }).exec();

    if (schoolExists) throw new ConflictException("School already exists");

    const createdSchool = new this.schoolModel({
      ...createSchoolDto,
    });

    return createdSchool.save();
  }

  findAll() {
    return `This action returns all schools`;
  }

  findOne(id: string): Promise<School> {
    return this.schoolModel.findById(id).exec();
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return `This action updates a #${id} school`;
  }

  remove(id: number) {
    return `This action removes a #${id} school`;
  }
}
