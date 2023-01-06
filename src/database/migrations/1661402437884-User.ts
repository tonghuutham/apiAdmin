import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1661402437884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE permissions (
        id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL,
        name varchar(10) NOT NULL,
        description varchar(100),
        created_at timestamp NULL DEFAULT NULL,
        updated_at timestamp NULL DEFAULT NULL
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE user_roles (
        id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
        name varchar(50) NOT NULL
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE users (
        id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL,
        name varchar(100) NOT NULL,
        email varchar(1000) NOT NULL,
        password varchar(1000) NOT NULL,
        user_role_id int(11) NOT NULL,
        gender int(2) DEFAULT NULL,
        dob date DEFAULT NULL,
        phoneNumber varchar(11) DEFAULT NULL,
        CONSTRAINT FK_user_role FOREIGN KEY (user_role_id) REFERENCES user_roles(id) ON UPDACASCADE ON DELETE CASCADE
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE role_permissions (
        id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL,
        role_id int(10)  NOT NULL,
        permission_id int(10) NOT NULL,
        CONSTRAINT FK_permissions_role FOREIGN KEY (permission_id) REFERENCES permissions(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT FK_role_user FOREIGN KEY (role_id) REFERENCES user_roles(id) ON UPDATE CASCADE ON DELETE CASCADE
      )`,
    );

    await queryRunner.query(
      `INSERT INTO user_roles (id, name) VALUES (1, 'admin'), (2, 'user')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE role_permissions;`);
    await queryRunner.query(`DROP TABLE users;`);
    await queryRunner.query(`DROP TABLE user_roles;`);
    await queryRunner.query(`DROP TABLE permissions;`);
  }
}
