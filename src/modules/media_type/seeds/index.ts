import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Media_type } from '../model/media_type.model';

@Seeder({
  model: Media_type,
  unique: ['media_type_name'],
})
export class MediaTypeSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        media_type_name: 'Изображение',
        media_type_extension: 'jpg,jpeg',
      },
      {
        media_type_name: 'Видео',
        media_type_extension: 'mpeg',
      },
    ];
    return data;
  }
}
