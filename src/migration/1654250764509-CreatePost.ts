import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { text } from 'stream/consumers';

export class CreatePost1654250764509 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        {name: 'id', type: 'int', isGenerated: true, isPrimary: true, generationStrategy: 'increment'},
        {name: 'title', type: 'varchar'},
        {name: 'content', type: 'text'}
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }
}
