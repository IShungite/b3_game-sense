import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import Role from "src/auth/models/roles.enum";
import { UsersService } from "src/users/users.service";
import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { School } from "./entities/school.schema";

@Injectable()
export class SchoolsService {
  constructor(
    @InjectModel(School.name) private readonly schoolModel: Model<School>,
    private readonly usersService: UsersService,
  ) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const schoolExists = await this.schoolModel.findOne({ name: createSchoolDto.name }).exec();

    if (schoolExists) throw new ConflictException("School already exists");

    const director = await this.usersService.findById(createSchoolDto.directorId);

    if (!director) throw new NotFoundException("Director id does not exist");

    if (!director.roles.includes(Role.Director))
      throw new UnauthorizedException("The user does not have the required role");

    const createdSchool = new this.schoolModel({
      ...createSchoolDto,
    });

    return createdSchool.save();
  }

  findDirectorSchools(userId: string): Promise<School[]> {
    return this.schoolModel.find({ directorId: userId }).exec();
  }

  findAll(): Promise<School[]> {
    return this.schoolModel.find().exec();
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
