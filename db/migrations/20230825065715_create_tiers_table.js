exports.up = function (knex) {
    return knex.schema.createTable('tiers', function (table) {
      table.increments('id').primary();
      table.string('tier'); 
      table.json('sharedInfo'); 
      table.json('platforms');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('tiers');
  };
  