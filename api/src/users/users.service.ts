import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import Role from "src/auth/models/roles.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.userModel
      .findOne({
        email: createUserDto.email,
      })
      .exec();

    if (userExist) throw new ConflictException("User already exists");

    const createdUser = new this.userModel({
      ...createUserDto,
      roles: [Role.Student],
    });

    return createdUser.save();
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findDirectors(): Promise<User[]> {
    return this.userModel.find({ roles: Role.Director });
  }

  async findProfessors(): Promise<User[]> {
    return this.userModel.find({ roles: Role.Professor });
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: number): Promise<void> {
    await this.userModel.findByIdAndRemove(id);
  }
}
