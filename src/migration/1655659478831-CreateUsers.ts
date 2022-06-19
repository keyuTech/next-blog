import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUsers1655659478831 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {name: 'id', type: 'int', isGenerated: true, isPrimary: true, generationStrategy: 'increment'},
        {name: 'username', type: 'varchar'},
        {name: 'password_digest', type: 'varchar'}
      ]
    }));
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
  
}
