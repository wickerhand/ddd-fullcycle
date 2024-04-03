import Order from "../../domain/entities/order";
import OrderItem from "../../domain/entities/order-item";
import OrderItemModel from "../database/sequelize/models/order-item.model";
import OrderModel from "../database/sequelize/models/order.model";
import OrderRepositoryInterface from "../interfaces/order-repository.interface";


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.getId(),
        customer_id: entity.getCustomerId(),
        total: entity.sum(),
        items: entity.getItems().map((item) => ({
          id: item.getId(),
          name: item.getProductName(),
          price: item.getPrice(),
          product_id: item.getProductId(),
          quantity: item.getQuantity(),
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async findAll(): Promise<Order[]> {
    const foundOrders = await OrderModel.findAll({
      include: ["items"],
    });

    const orders: Order[] = foundOrders.map((order) => {
      const items: OrderItem[] = order.items.map((item) => {
        return new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity);
      });

      return new Order(order.id, order.customer_id, items);
    });

    return orders;
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.getCustomerId(),
        total: entity.sum(),
        items: entity.getItems().map((item) => ({
          id: item.getId(),
          name: item.getProductName(),
          price: item.getPrice(),
          product_id: item.getProductId(),
          quantity: item.getQuantity(),
        })),
      },
      {
        where: { id: entity.getId() },
      }
    );  
  }

  async findById(id: string): Promise<Order | null> {
    const foundOrder = await OrderModel.findOne({where: { id }, include: ["items"]});
    const orderItems = foundOrder?.items.map((item) => {
      return new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity);
    });

    return foundOrder ? new Order(foundOrder.id, foundOrder.customer_id, orderItems) : null;
  }

  async delete(id: string): Promise<void> {
    await OrderModel.destroy({
      where: { id },
    });
  }
}
