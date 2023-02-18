import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { HasRoles } from 'src/modules/auth/guards/roles.decorator';
import { Role } from '../../auth/guards/enums/role.enum';
import { PersonDTO, PersonUpdateDTO } from './dto';
import { PersonService } from './person.service';
import { PersonResponse, PersonUpdateResponse } from './response';

@Controller('dashboard/persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}
  @ApiTags('PersonApi')
  @ApiResponse({ status: 200, type: PersonUpdateResponse })
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updatePerson(
    @Body() personDTO: PersonUpdateDTO,
    @Req() request,
  ): Promise<PersonUpdateResponse> {
    const { id } = request.user;
    console.log(request.user);
    personDTO.user_id = id;
    return this.personService.updatePerson(personDTO);
  }

  @ApiTags('PersonApi')
  @ApiResponse({ status: 200, type: PersonDTO })
  @HasRoles(Role.Authorized)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('self')
  getPerson(@Req() request): Promise<PersonResponse> {
    const { id } = request.user;
    return this.personService.findPerson(id);
  }
}
