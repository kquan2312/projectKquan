import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateElectronicItemDto } from './dto/create-electronic-item.dto';
import { ElectronicItemService } from './electronic-item.service';

@Controller('electronic-item')
// @UseGuards(JwtAuthGuard)
export class ElectronicItemController {
  constructor(private readonly electronicItemService: ElectronicItemService) {}

  @Post()
  create(@Body() createElectronicItemDto: CreateElectronicItemDto) {
    return this.electronicItemService.create(createElectronicItemDto);
  }

  @Get()
  findAll(@Query() queryParams: Record<string, any>) {
    return this.electronicItemService.findAll(queryParams);
  }
  @Get('all-brand')
  findAllBrand() {
    return this.electronicItemService.findAllBrand();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electronicItemService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateElectronicItemDto: CreateElectronicItemDto,
  ) {
    return this.electronicItemService.update(id, updateElectronicItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electronicItemService.remove(id);
  }
}
