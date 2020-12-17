import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
       return knex.schema.createTable('job_offer', table => {
          table.uuid('id').primary()
          table.string('user_id').references('id').inTable('recruiter').onDelete('cascade')
          table.text('title').nullable()
          table.text('job_description').notNullable()
          table.specificType('tags', 'character varying(200)[]').notNullable()
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('job_offer');
}

