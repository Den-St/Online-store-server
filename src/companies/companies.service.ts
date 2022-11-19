import { ImageService } from './../image/image.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { Repository } from 'typeorm';
import { CompanyCreateDto } from './dto/company-create.dto';
import { UserEntity } from '../entities/user.entity';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { generateUniqueFileName } from 'src/helpers/generateUniqueFileName';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly ImageService:ImageService
  ) {}

  async create(dto: CompanyCreateDto): Promise<CompanyEntity> {
    const prevUser = await this.userRepository.findOne({
      relations: {
        roles: true,
        companies: true,
      },
      where: {
        id: dto.creatorId,
      },
    });
    const {createReadStream, filename } = await dto.image;

    const uniqueFileName = generateUniqueFileName(filename);

    const stream = createReadStream();
    const pathName = join(process.cwd(), `./public/upload/${uniqueFileName}`);
    await stream.pipe(createWriteStream(pathName));

    const image = await this.ImageService.create({
      url:`http://localhost:4000/upload/${uniqueFileName}`,
      isMain:true
    })

    const company = await this.companyRepository.create({
      name: dto.name,
      creator: prevUser,
      image:image
    });

    await this.userRepository.save({
      ...prevUser,
      companies: [...prevUser.companies, company],
    });

    return await this.companyRepository.save(company);
  }

  async getById(id: number): Promise<CompanyEntity> {
    return await this.companyRepository.findOne({where:{id:id}});
  }

  async getUsersCompanies(id: number): Promise<CompanyEntity[]> {
    const user = await this.userRepository.findOne({
      relations: [
          "companies",
          "companies.image"
      ],
      where: {
        id: id,
      },
    });

    return user.companies;
  }
}
