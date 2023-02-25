import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PersonDTO, PersonUpdateDTO } from './dto';
import { Person } from './model/person.model';
import { PersonResponse, PersonUpdateResponse } from './response';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person) private readonly personRepository: typeof Person,
  ) {}
  async findPerson(id: number): Promise<PersonResponse> {
    try {
      const person = await this.personRepository.findOne({
        where: { user_id: id },
      });
      return person;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createPerson(personDTO: PersonDTO): Promise<PersonResponse> {
    try {
      await this.personRepository.create({
        user_id: personDTO.user_id,
      });
      const person = await this.findPerson(personDTO.user_id);
      return person;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updatePerson(
    personDTO: PersonUpdateDTO,
  ): Promise<PersonUpdateResponse> {
    personDTO.first_name =
      personDTO.first_name[0].toUpperCase() +
      personDTO.first_name.substring(1).toLowerCase();
    personDTO.last_name =
      personDTO.last_name[0].toUpperCase() +
      personDTO.last_name.substring(1).toLowerCase();
    personDTO.middle_name =
      personDTO.middle_name[0].toUpperCase() +
      personDTO.middle_name.substring(1).toLowerCase();
    try {
      const updatePerson = await this.personRepository.update(
        {
          ...personDTO,
        },
        { where: { user_id: personDTO.user_id } },
      );
      if (updatePerson[0] === 1) {
        return { updateStatus: true };
      }
      return { updateStatus: false };
    } catch (error) {
      throw new Error(error);
    }
  }
}
