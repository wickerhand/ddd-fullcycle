import Product from "../../domain/entities/product";
import ProductModel from "../database/sequelize/models/product.model";
import ProductRepositoryInterface from "../interfaces/product-repository.interface";


export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.getId(),
      name: entity.getName(),
      price: entity.getPrice(),
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.getName(),
        price: entity.getPrice(),
      },
      {
        where: {
          id: entity.getId(),
        },
      }
    );
  }

  async findById(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });
    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findBySku(sku: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { sku } });
    return new Product(productModel.id, productModel.name, productModel.price);
  
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map((productModel) =>
      new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}
