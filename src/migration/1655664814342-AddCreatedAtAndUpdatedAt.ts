import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddCreatedAtAndUpdatedAt1655664814342 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'created_at', type: 'timestamp', isNullable: false, default: 'now()'
      }),
      
      new TableColumn({
        name: 'updated_at', type: 'timestamp', isNullable: false, default: 'now()'
      })
    ]);
    await queryRunner.addColumns('posts', [
      new TableColumn({
        name: 'created_at', type: 'timestamp', isNullable: false, default: 'now()'
      }),
      
      new TableColumn({
        name: 'updated_at', type: 'timestamp', isNullable: false, default: 'now()'
      })
    ]);
    await queryRunner.addColumns('comments', [
      new TableColumn({
        name: 'created_at', type: 'timestamp', isNullable: false, default: 'now()'
      }),
      
      new TableColumn({
        name: 'updated_at', type: 'timestamp', isNullable: false, default: 'now()'
      })
    ]);
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['created_at', 'updated_at']);
    await queryRunner.dropColumns('posts', ['created_at', 'updated_at']);
    await queryRunner.dropColumns('comments', ['created_at', 'updated_at']);
  }
  
}
