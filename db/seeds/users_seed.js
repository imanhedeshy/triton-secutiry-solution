exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          name: "Alice Smith",
          email: "alice@example.com",
          phonenumber: "1234567890",
          password: "hashedpassword",
          address: "123 Main St",
          credit_card_info: "1234-5678-9012-3456",
          date_of_birth: "1990-01-01",
          mock_data_1: "Mock Value 1",
          mock_data_2: "Mock Value 2",
        },
      ]);
    });
};
