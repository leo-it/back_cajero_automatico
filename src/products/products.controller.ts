import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(@Res() res: Response) {
    const products = await this.productsService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: 'Productos almacenados',
      products,
    });
  }

  @Get(':id')
  async getProduct(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.getProduct(id);
    return res.status(HttpStatus.OK).json({
      message: 'Producto almacenado',
      product,
    });
  }

  @Post()
  async createProduct(
    @Body() productDto: CreateProductDto,
    @Res() res: Response,
  ) {
    const product = await this.productsService.createProduct(productDto);
    return res.status(HttpStatus.OK).json({
      message: 'Producto almacenado correctamente',
      product,
    });
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    const product = await this.productsService.updateProduct(id, productDto);
    return res.status(HttpStatus.OK).json({
      message: 'Producto editado',
      product,
    });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.deleteProduct(id);
    return res.status(HttpStatus.OK).json({
      message: 'Producto eliminado',
      product,
    });
  }
}
