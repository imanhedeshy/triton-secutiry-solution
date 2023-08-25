// 20230825065122_create_platforms_table.js
exports.up = function(knex) {
    return knex.schema.table('platforms', function(table) {
      table.string('secret').notNullable();
      table.string('redirectUri').notNullable();
    });
  };
  

exports.down = function (knex) {
  return knex.schema.table("platforms", function (table) {
    table.dropColumn("secret");
    table.dropColumn("redirectUri");
  });
};
