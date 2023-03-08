import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Page extends Model {
  @Column
  page_title: string;
  @Column
  page_image: string;
  @Column
  slug: string;
  @Column
  short_page_description: string;
  @Column({ type: DataType.TEXT })
  page_description_html: string;
  @Column
  page_keywords: string;
  @Column
  page_description_meta: string;
  @Column
  page_description_short_seo: string;
  @Column
  page_description_seo: string;
}
