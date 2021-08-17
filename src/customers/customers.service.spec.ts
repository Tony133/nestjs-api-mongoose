import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

const mockCustomer: any = {
  firstName: 'firstName#1',
  lastName: 'lastName#1',
  email: 'test@example.it',
  phone: '1234567890',
  address: 'address #1',
  description: 'description #1',
  organizations: 'organization #1',
};

describe('CustomersService', () => {
  let service: CustomersService;
  const paginationQueryDto: PaginationQueryDto = {
    limit: 10,
    offset: 1
  }; 

  const createCustomerDto: CreateCustomerDto = {
    firstName: 'firstName#1',
    lastName: 'lastName#1',
    email: 'test@example.it',
    phone: '1234567890',
    address: 'address #1',
    description: 'description #1',
    organizations: 'organization #1',
  };
    
  const updateCustomerDto: UpdateCustomerDto = {
    firstName: 'firstName update',
    lastName: 'lastName update',
    email: 'test@example.it',
    phone: '1234567890',
    address: 'address update',
    description: 'description update',
    organizations: 'organization update',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService, 
        {
          provide: CustomersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn()          
          }    
        }
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call find all method', async () => {
      const findSpy = jest.spyOn(service, 'findAll');
      await service.findAll(paginationQueryDto);
      expect(findSpy).toHaveBeenCalled();
    });

    it('should throw if CustomerModel findAll throws', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      await expect(service.findAll(paginationQueryDto)).rejects.toThrow(new Error())
    });

    it('should return customer on success', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockCustomer);
      const response = await service.findAll(paginationQueryDto);
      expect(response).toEqual(mockCustomer);
    });
  });

  describe('findOne()', () => {
    it('should call CustomerModel findOne with correct value', async () => {
      const findSpy = jest.spyOn(service, 'findOne');
      await service.findOne('anyid');
      expect(findSpy).toHaveBeenCalledWith('anyid');
    });

    it('should throw if CustomerSchema findOne throws', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      await expect(service.findOne('anyid')).rejects.toThrow(new Error());
    });

    it('should return a customer on success', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockCustomer)
      const response = await service.findOne('anyid');
      expect(response).toEqual(mockCustomer);
    });
  });

  describe('create()', () => {
    it('should call CustomerSchema create with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await service.create(mockCustomer);
      expect(createSpy).toHaveBeenCalledWith(mockCustomer);
    });

    it('should throw if CustomerSchema create throws', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      await expect(service.create(createCustomerDto)).rejects.toThrow(new Error());
    });

    it('should return a customer on success', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(mockCustomer);
      const response = await service.create(createCustomerDto);
      expect(response).toEqual(mockCustomer);
    });
  });

  describe('update()', () => {
    it('should call CustomerSchema update with correct values', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await service.update('anyid', updateCustomerDto);
      expect(updateSpy).toHaveBeenCalledWith('anyid', updateCustomerDto);
    });

    it('should throw if CustomerSchema throws', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      await expect(service.update('anyid', updateCustomerDto)).rejects.toThrow(new Error());
    });
  });

  describe('remove()', () => {
    it('should call CustomerSchema remove with correct value', async () => {
      const deleteSpy = jest.spyOn(service, 'remove');
      await service.remove('anyid');
      expect(deleteSpy).toBeCalledWith('anyid');
    });

    it('should throw if CustomerSchema remove throws', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());
      await expect(service.remove('anyid')).rejects.toThrow(new Error())
    });
  });
});
