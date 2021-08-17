import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsService } from './organizations.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

const mockOrganization: any = {
  name: 'name #1',
  address: 'address #1',
  description: 'description #1',
  customers: 'customer #1',
};

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  const paginationQueryDto: PaginationQueryDto = {
    limit: 10,
    offset: 1
  }; 

  const createOrganizationDto: CreateOrganizationDto = {
    name: 'name #1',
    address: 'address #1',
    description: 'description #1',
    customers: 'customer #1',
  };  

  const updateOrganizationDto: UpdateOrganizationDto = {
    name: 'name update',
    address: 'address update',
    description: 'description update',
    customers: 'customer update',
  };  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        {
          provide: OrganizationsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn()          
          },
        }
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call findAll method', async () => {
      const findSpy = jest.spyOn(service, 'findAll');
      await service.findAll(paginationQueryDto);
      expect(findSpy).toHaveBeenCalled();
    });

    it('should throw if OrganizationSchema findAll throws', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      await expect(service.findAll(paginationQueryDto)).rejects.toThrow(new Error())
    });

    it('should return organization on success', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockOrganization);
      const response = await service.findAll(paginationQueryDto);
      expect(response).toEqual(mockOrganization);
    });
  });

  describe('findOne()', () => {
    it('should call OrganizationSchema findOne with correct value', async () => {
      const findSpy = jest.spyOn(service, 'findOne');
      await service.findOne('anyid');
      expect(findSpy).toHaveBeenCalledWith('anyid');
    });

    it('should throw if OrganizationSchema findOne throws', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      await expect(service.findOne('anyid')).rejects.toThrow(new Error());
    });

    it('should return a organization on success', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockOrganization)
      const response = await service.findOne('anyid');
      expect(response).toEqual(mockOrganization);
    });
  });

  describe('create()', () => {
    it('should call OrganizationSchema create with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await service.create(mockOrganization);
      expect(createSpy).toHaveBeenCalledWith(mockOrganization);
    });

    it('should throw if OrganizationSchema create throws', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      await expect(service.create(createOrganizationDto)).rejects.toThrow(new Error());
    });

    it('should return a organization on success', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(mockOrganization);
      const response = await service.create(createOrganizationDto);
      expect(response).toEqual(mockOrganization);
    });
  });

  describe('update()', () => {
    it('should call OrganizationSchema update with correct values', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await service.update('anyid', updateOrganizationDto);
      expect(updateSpy).toHaveBeenCalledWith('anyid', updateOrganizationDto);
    });

    it('should throw if OrganizationSchema throws', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      await expect(service.update('anyid', updateOrganizationDto)).rejects.toThrow(new Error());
    });
  });

  describe('remove()', () => {
    it('should call OrganizationSchema remove with correct value', async () => {
      const deleteSpy = jest.spyOn(service, 'remove');
      await service.remove('anyid');
      expect(deleteSpy).toBeCalledWith('anyid');
    });

    it('should throw if OrganizationSchema remove throws', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());
      await expect(service.remove('anyid')).rejects.toThrow(new Error())
    });
  });
});
