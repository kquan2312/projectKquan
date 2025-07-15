import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ElectronicCategoryService } from './electronic-category.service';
import { CreateElectronicCategoryDto } from './dto/create-electronic-category.dto';
import { UpdateElectronicCategoryDto } from './dto/update-electronic-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('electronic-category')
// @UseGuards(JwtAuthGuard)
export class ElectronicCategoryController {
  constructor(
    private readonly electronicCategoryService: ElectronicCategoryService,
  ) {}

  @Post()
  async create(
    @Body() createElectronicCategoryDto: CreateElectronicCategoryDto,
  ) {
    return this.electronicCategoryService.create(createElectronicCategoryDto);
  }

  @Get()
  async findAll(@Query() queryParams: Record<string, any>) {
    return this.electronicCategoryService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electronicCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateElectronicCategoryDto: UpdateElectronicCategoryDto,
  ) {
    return this.electronicCategoryService.update(
      id,
      updateElectronicCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electronicCategoryService.remove(id);
  }
}
