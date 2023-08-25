// 20230825065122_create_platforms_table.js
exports.up = function(knex) {
    return knex.schema.createTable('platforms', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.json('info_access').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('platforms');
  };
  