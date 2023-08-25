// 20230825043704_create_users_table.js
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.string('phonenumber');
      table.string('password');
      table.string('address');
      table.string('credit_card_info');
      table.date('date_of_birth');
      table.string('mock_data_1');
      table.string('mock_data_2');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
  