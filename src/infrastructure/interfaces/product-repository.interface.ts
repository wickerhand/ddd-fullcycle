import Product from "../../domain/entities/product";
import RepositoryInterface from "../../domain/interfaces/repository-interface";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product>{
    findBySku(sku: string): Promise<Product>;
}