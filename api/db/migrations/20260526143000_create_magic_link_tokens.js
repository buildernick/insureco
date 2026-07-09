/**
 * Migration: create_magic_link_tokens
 *
 * Creates the table used to store hashed one-time tokens for
 * passwordless / magic-link authentication.
 */

export async function up(knex) {
  await knex.schema.createTable('magic_link_tokens', (table) => {
    table.increments('id').primary();
    table.string('email', 254).notNullable();
    // Store only the SHA-256 hash — raw token is never persisted
    table.string('token_hash', 64).notNullable().unique();
    table.timestamp('expires_at').notNullable();
    table.boolean('used').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.index('email');
    table.index('token_hash');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('magic_link_tokens');
}
