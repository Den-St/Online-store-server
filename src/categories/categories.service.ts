import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from './dto/category-create.dto';
import { CategoriesAddCharDto } from './dto/categories-add-char.dto';
import { CharacteristicsService } from '../characteristics/characteristics.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly charService: CharacteristicsService,
  ) {}

  async create(dto: CategoryCreateDto): Promise<CategoryEntity> {
    return await this.categoryRepository.save(dto);
  }

  async getAllMain(): Promise<CategoryEntity[]> {
    return await (
      await this.categoryRepository.find()
    ).filter((el) => el.isMain);
  }
  async getAllNotMain(): Promise<CategoryEntity[]> {
    return await (
      await this.categoryRepository.find()
    ).filter((el) => !el.isMain);
  }

  async getById(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['characteristics', 'characteristics.values'],
    });
  }

  async addChar(dto: CategoriesAddCharDto): Promise<CategoryEntity> {
    const char = await this.charService.getById(dto.characteristicId);
    const prevCategory = await this.categoryRepository.findOne({
      relations: ['characteristics', 'characteristics.values'],
      where: {
        id: dto.categoryId,
      },
    });
    console.log('prevCategory', prevCategory);
    console.log('char', char);
    const newChar = await this.categoryRepository.create({
      ...prevCategory,
      characteristics: [...prevCategory.characteristics, char],
    });

    return await this.categoryRepository.save(newChar);
  }

  async getChildCategories(id: number): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findBy({ parentId: id });
  }

  async getCategoriesLine(id:number):Promise<CategoryEntity[]> {
    const categoriesLine:CategoryEntity[] = [];

    let category = await this.categoryRepository.findOne({where:{id}});

    while(category){
      categoriesLine.push(category);
      
      if(category.parentId){
        category = await this.categoryRepository.findOne({where:{id:category.parentId}});
      }else{
        return categoriesLine.reverse();
      }
    }

  }
}
