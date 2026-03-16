    import { Entity, PrimaryColumn, Column } from "typeorm";

    @Entity('transactions')

    export class Transaction {
        @PrimaryColumn({ type: "varchar" })
        id: string;
        
        @Column({ type: "varchar", nullable: false })
            title: string;
        
        @Column({ type: "decimal", nullable: false })
        amount: number;

        @Column({ type: "varchar", nullable: false })
        type: string

        @Column({ type: "varchar", nullable: false })
        id_user: string


        constructor(
            title: string,
            amount: number,
            type: string,
            id_user: string
        ){
            this.id = crypto.randomUUID();
            this.title = title
            this.amount = amount
            this.type = type
            this.id_user = id_user
        }
    }
