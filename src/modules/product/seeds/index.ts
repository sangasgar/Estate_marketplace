import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Product } from '../model/product.model';

@Seeder({
  model: Product,
  unique: ['product_name'],
})
export class ProductSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        product_name: 'Property Dubai',
        product_title: 'Property Dubai',
        product_short_description: '',
        product_description: '',
        product_is_visible: false,
        product_price: 0,
        product_sku_developer: '1',
        product_old_price: 0,
        product_purchase_price: 0,
        product_frontend_id: '1',
        product_discount_percent: 0,
        product_discount_price: 0,
        product_quantity: 1,
        product_category_id: 1,
        product_keywords: 'property',
        product_type_id: 1,
        company_id: 1,
        Media_type: [
          {
            product_media_url: 'url',
            product_id: 1,
            media_type_id: 1,
          },
        ],
        product_description_meta: 'default',
        product_description_short_seo: 'default',
        product_description_seo: 'default',
        Tags: [
          {
            tag_id: 1,
            product_id: 1,
          },
        ],
        slug: 'property-dubai',
      },
    ];
    return data;
  }
}
