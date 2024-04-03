import Customer from '../../domain/entities/customer';
import RepositoryInterface from '../../domain/interfaces/repository-interface';

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {

}