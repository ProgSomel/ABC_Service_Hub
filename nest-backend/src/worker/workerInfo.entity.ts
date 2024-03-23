import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkersEntity } from "./worker.entity";

@Entity('worker_info')
export class WorkerInfoEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    bio: string;
  
    @Column()
    address: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    hourlyRate: number;
  

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @OneToOne(() => WorkersEntity, worker => worker.workerInfo)
    @JoinColumn()
    worker: WorkersEntity;

    }
