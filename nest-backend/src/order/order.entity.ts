import { ClientEntity } from "src/clients/clients.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
  }

  export enum PaymentMethod {
    CASH_ON_DELIVERY = 'cash_on_delivery',
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    PAYPAL = 'paypal',
  }
  

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column()
    orderDate: Date;

    @Column()
    totalPrice: number;

    @Column()
    quantity: number;

    @Column({ default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ default: PaymentMethod.CASH_ON_DELIVERY })
  paymentMethod: PaymentMethod;
  
//!   many orders belong to one customer
    @ManyToOne(()=> ClientEntity, client => client.orders)
    client: ClientEntity;
}