import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPriceToToy1607239129201 implements MigrationInterface {
    name = 'AddPriceToToy1607239129201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `toy` DROP COLUMN `title`");
        await queryRunner.query("ALTER TABLE `toy` ADD `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `toy` ADD `price` int NOT NULL");
        await queryRunner.query("ALTER TABLE `toy` CHANGE `description` `description` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `toy` CHANGE `description` `description` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `toy` DROP COLUMN `price`");
        await queryRunner.query("ALTER TABLE `toy` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `toy` ADD `title` varchar(255) NOT NULL");
    }

}
