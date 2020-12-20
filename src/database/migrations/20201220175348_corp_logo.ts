
import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('logo_corp', table => {
          table.uuid('id').primary()
          table.string('user_id').references('id').inTable('recruiter').onDelete('cascade')
          table.string('avatar_url').notNullable();
      })
}
export async function down(knex: Knex): Promise<void> {
        return knex.schema.dropTable('logo_corp');

}
