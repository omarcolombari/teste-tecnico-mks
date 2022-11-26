import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class createRelations1669483083278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'movies',
      new TableForeignKey({
        name: 'moviesFK',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('movies', 'moviesFK');
  }
}
