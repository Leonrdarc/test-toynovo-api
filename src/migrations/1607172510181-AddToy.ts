import {MigrationInterface, QueryRunner} from "typeorm";

export class AddToy1607172510181 implements MigrationInterface {
    name = 'AddToy1607172510181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `toy` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `img` varchar(255) NOT NULL DEFAULT 'default.png', PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `toy`");
    }

}
