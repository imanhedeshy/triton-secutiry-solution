exports.seed = function (knex) {
  return knex("platforms")
    .del()
    .then(function () {
      return knex("platforms").insert([
        {
          name: "live",
          info_access: JSON.stringify([
            "Name",
            "Password",
            "Phone Number",
            "Address",
            "Credit/Debit Card Details",
            "Date of Birth",
            "Social Security Number",
          ]),
        },
        {
          name: "xbox",
          info_access: JSON.stringify([
            "Name",
            "Password",
            "Phone Number",
            "Address",
            "Credit/Debit Card Details",
            "Date of Birth",
            "Social Security Number",
          ]),
        },
        {
          name: "instagram",
          info_access: JSON.stringify([
            "Name",
            "Password",
            "Phone Number",
            "Address",
            "Date of Birth",
          ]),
        },
        {
          name: "twitter",
          info_access: JSON.stringify([
            "Name",
            "Password",
            "Phone Number",
            "Address",
            "Date of Birth",
          ]),
        },
        {
          name: "gmail",
          info_access: JSON.stringify(["Name", "Phone Number"]),
        },
        {
          name: "facebook",
          info_access: JSON.stringify(["Name", "Phone Number"]),
        },
        {
          name: "amazon",
          info_access: JSON.stringify([
            "Name",
            "Password",
            "Phone Number",
            "Address",
            "Date of Birth",
            "Credit/Debit Card Details",
            "Social Security Number",
          ]),
        },
        {
          name: "linkedin",
          info_access: JSON.stringify([
            "Name",
            "Password",
            "Phone Number",
            "Address",
            "Date of Birth",
            "Credit/Debit Card Details",
            "Social Security Number",
          ]),
        },
      ]);
    });
};
