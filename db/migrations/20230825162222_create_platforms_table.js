// 20230825162222_create_platforms_table.js
exports.up = function(knex) {
  return knex.schema.createTable('platforms', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.json('info_access').notNullable();
    table.string('secret').notNullable().defaultTo('default-secret-value');
    table.string('redirectUri'); 
  });
};

  
  exports.down = function(knex) {
    return knex.schema.dropTable('platforms');
  };
  