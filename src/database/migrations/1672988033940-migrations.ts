import { MigrationInterface, QueryRunner } from "typeorm"

export class migrations1672988033940 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users (
                name varchar(100) NOT NULL,
                email varchar(1000) NOT NULL,
                password varchar(1000) NOT NULL,
                phoneNumber varchar(11) DEFAULT NULL,
            )`,
            ) ;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
