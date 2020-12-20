
import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user_avatar', table => {
          table.uuid('id').primary()
          table.string('user_id').references('id').inTable('candidate').onDelete('cascade')
          table.string('avatar_url').notNullable();
      })
}
export async function down(knex: Knex): Promise<void> {
      return knex.schema.dropTable('user_avatar');


}

