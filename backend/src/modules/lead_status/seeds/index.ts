import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Lead_Status } from '../model/lead_status.model';

@Seeder({
  model: Lead_Status,
  unique: ['lead_status_name'],
})
export class LeadStatusSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        lead_status_name: 'Создано',
      },
      {
        lead_status_name: 'В работе',
      },
      {
        lead_status_name: 'Подбор объекта',
      },
      {
        lead_status_name: 'Заключение договора',
      },
      {
        lead_status_name: 'Выставление счета',
      },
      {
        lead_status_name: 'Оплачено',
      },
      {
        lead_status_name: 'Выполнено',
      },
    ];
    return data;
  }
}
