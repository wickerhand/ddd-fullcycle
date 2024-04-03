import Address from "../../domain/entities/adress";
import Customer from "../../domain/entities/customer";
import CustomerModel from "../database/sequelize/models/customer.model";
import CustomerRepositoryInterface from "../interfaces/customer-repository.interface";


export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.getId(),
      name: entity.getName(),
      street: entity.getAddress().getStreet(),
      number: entity.getAddress().getNumber(),
      zipcode: entity.getAddress().getZipCode(),
      city: entity.getAddress().getCity(),
      active: entity.isActive(),
      rewardPoints: entity.getRewardPoints(),
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.getName(),
        street: entity.getAddress().getStreet(),
        number: entity.getAddress().getNumber(),
        zipcode: entity.getAddress().getZipCode(),
        city: entity.getAddress().getCity(),
        active: entity.isActive(),
        rewardPoints: entity.getRewardPoints(),
      },
      {
        where: {
          id: entity.getId(),
        },
      }
    );
  }

  async findById(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModels) => {
      let customer = new Customer(customerModels.id, customerModels.name);
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.street,
        customerModels.number,
        customerModels.zipcode,
        customerModels.city
      );
      customer.changeAddress(address);
      if (customerModels.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}
