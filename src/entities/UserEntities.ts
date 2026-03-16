
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column} from "typeorm";

@Entity('users')

export class User {
   @PrimaryColumn({ type: "varchar" })
    id: string;

    @Column({ type: "varchar", nullable: false })
    name: string;

    @Column({ type: "varchar", nullable: false })
    email: string;

    @Column({ type: "varchar", nullable: false })
    password: string;


    constructor(
        name: string,
        email: string,
        password: string
    ){
        this.id = crypto.randomUUID();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

