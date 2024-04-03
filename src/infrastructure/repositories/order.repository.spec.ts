import { Sequelize } from "sequelize-typescript";

import OrderRepository from "./order.repository";
import CustomerModel from "../database/sequelize/models/customer.model";
import OrderModel from "../database/sequelize/models/order.model";
import OrderItemModel from "../database/sequelize/models/order-item.model";
import ProductModel from "../database/sequelize/models/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entities/customer";
import Address from "../../domain/entities/adress";
import ProductRepository from "./product.repository";
import Product from "../../domain/entities/product";
import OrderItem from "../../domain/entities/order-item";
import Order from "../../domain/entities/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.getId(),
      product.getName(),
      product.getPrice(),
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.getId() },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.sum(),
      items: [
        {
          id: orderItem.getId(),
          name: orderItem.getProductName(),
          price: orderItem.getPrice(),
          quantity: orderItem.getQuantity(),
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.getId(),
      product.getName(),
      product.getPrice(),
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orders = await orderRepository.findAll();

    expect(orders).toStrictEqual([order]);
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.getId(),
      product.getName(),
      product.getPrice(),
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const newProduct = new Product("456", "Product 2", 20);
    await productRepository.create(newProduct);

    const newOrderItem = new OrderItem(
      "1",
      newProduct.getId(),
      newProduct.getName(),
      newProduct.getPrice(),
      3
    );

    const newOrder = new Order("123", "123", [newOrderItem]);
    const updateOrder = await orderRepository.update(newOrder);
    const updateOrderItems = await OrderItemModel.update(
      {
        product_id: newOrderItem.getProductId(),
        name: newOrderItem.getProductName(),
        price: newOrderItem.getPrice(),
        quantity: newOrderItem.getQuantity(),
      }, 
      {where: {order_id: order.getId(), id: newOrderItem.getId()}
    });


    await Promise.all([updateOrder, updateOrderItems]);

    const orderModel = await OrderModel.findOne({
      where: { id: order.getId() },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: newOrder.sum(),
      items: [
        {
          id: newOrderItem.getId(),
          name: newOrderItem.getProductName(),
          price: newOrderItem.getPrice(),
          quantity: newOrderItem.getQuantity(),
          order_id: "123",
          product_id: "456",
        },
      ],
    });
  });

  it("should find an order by id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.getId(),
      product.getName(),
      product.getPrice(),
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.findById(order.getId());

    expect(foundOrder).toStrictEqual(order);
  });

  it("should return null when order is not found by id", async () => {
    const orderRepository = new OrderRepository();
    const foundOrder = await orderRepository.findById("123");

    expect(foundOrder).toBeNull();
  });

  it("Should delete an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.getId(),
      product.getName(),
      product.getPrice(),
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    await orderRepository.delete(order.getId());

    const foundOrder = await orderRepository.findById(order.getId());
    expect(foundOrder).toBe(null);
  });
});
