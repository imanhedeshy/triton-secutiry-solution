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
          secret: "your-secret-key-1",
          redirectUri: "your-redirect-uri-1",
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
          secret: "your-secret-key-2",
          redirectUri: "your-redirect-uri-2",
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
          secret: "your-secret-key-3",
          redirectUri: "your-redirect-uri-3",
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
          secret: "your-secret-key-4",
          redirectUri: "your-redirect-uri-4",
        },
        {
          name: "gmail",
          info_access: JSON.stringify(["Name", "Phone Number"]),
          secret: "your-secret-key-5",
          redirectUri: "your-redirect-uri-5",
        },
        {
          name: "facebook",
          info_access: JSON.stringify(["Name", "Phone Number"]),
          secret: "your-secret-key-6",
          redirectUri: "your-redirect-uri-6",
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
          secret: "your-secret-key-7",
          redirectUri: "your-redirect-uri-7",
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
          secret: "your-secret-key-8",
          redirectUri: "your-redirect-uri-8",
        },
      ]);
    });
};
