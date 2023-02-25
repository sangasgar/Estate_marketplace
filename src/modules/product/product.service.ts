import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product, Products_Media_Types, Viewed } from './model/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
    @InjectModel(Products_Media_Types)
    private readonly productMediaTypesRepository: typeof Products_Media_Types,
    @InjectModel(Viewed)
    private readonly viewedRepository: typeof Viewed,
  ) {}
}
