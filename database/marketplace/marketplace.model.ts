import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './products/product.model';
import { Order } from './orders/order.model';

@Entity()
export class Marketplace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Product, (product) => product.marketplace)
  products: Product[];

  @OneToMany(() => Order, (order) => order.marketplace)
  orders: Order[];
}
