
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Transaction1773597377738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'title',
                        type: 'string',
                        isNullable: false
                    },
                    {
                        name: 'amount',
                        type: 'decimal',
                        isNullable: false
                    },
                    {
                        name: 'type',
                        type: 'string',
                        isNullable: false
                    },
                    {
                        name: 'id_user',
                        type: 'uuid',
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions");
    }

}
