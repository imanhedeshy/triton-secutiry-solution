exports.seed = function (knex) {
  return knex("tiers")
    .del()
    .then(function () {
      return knex("tiers").insert([
        {
          tier: "Tier 1",
          sharedInfo: JSON.stringify([
            "Name",
            "Password",
            "Phone Number",
            "Address",
            "Credit/Debit Card Details",
            "Date of Birth",
            "Social Security Number",
          ]),
          platforms: JSON.stringify(["live", "xbox"]),
        },
        {
          tier: "Tier 2",
          sharedInfo: JSON.stringify([
            "Name",
            "Password",
            "Phone Number",
            "Address",
            "Credit/Debit Card Details",
            "Date of Birth",
          ]),
          platforms: JSON.stringify(["amazon", "linkedin"]),
        },
        {
          tier: "Tier 3",
          sharedInfo: JSON.stringify([
            "Name",
            "Password",
            "Phone Number",
            "Address",
            "Date of Birth",
          ]),
          platforms: JSON.stringify(["instagram", "twitter"]),
        },
        {
          tier: "Tier 4",
          sharedInfo: JSON.stringify(["Name", "Phone Number"]),
          platforms: JSON.stringify(["gmail", "facebook"]),
        },
      ]);
    });
};
