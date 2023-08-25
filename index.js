const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("knex");
const speakeasy = require("speakeasy");
const dbConfig = require("./knexfile");

const app = express();
const port = 8080;

const database = knex(dbConfig.development);

app.use(bodyParser.json());

const JWT_SECRET = "v8G7g9AZQu44tam9G565eISJ3pn3T-H6tTODAvviSgA";

// Middleware for verifying JWT
function verifyJWT(req, res, next) {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
}

// POST endpoint to register a new user
app.post("/api/register", async (req, res) => {
  try {
    const {
      name,
      email,
      phonenumber,
      password,
      address,
      credit_card_info,
      date_of_birth,
    } = req.body;

    // Validate input data
    if (
      !name ||
      !email ||
      !phonenumber ||
      !password ||
      !address ||
      !credit_card_info ||
      !date_of_birth
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user with the same email already exists
    const existingUser = await database("users").where({ email }).first();
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the database
    const [userId] = await database("users").insert({
      name,
      email,
      phonenumber,
      password: hashedPassword,
      address,
      credit_card_info,
      date_of_birth,
    });

    // Create and sign a JWT
    const token = jwt.sign({ id: userId }, JWT_SECRET);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST endpoint for user login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user data by email
    const user = await database("users").where({ email }).first();
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Compare passwords    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    // Create and sign a JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    res.json({ message: "Login successful", token, status: true });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// GET endpoint to fetch all tiers
app.get("/api/tiers", async (req, res) => {
  try {
    const tiers = await database.select().from("tiers");
    res.json(tiers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST endpoint to create a new tier
app.post("/api/tiers", verifyJWT, async (req, res) => {
  try {
    const { tier, sharedInfo, platforms } = req.body;
    const newTier = {
      tier,
      sharedInfo: JSON.stringify(sharedInfo),
      platforms: JSON.stringify(platforms),
    };
    await database("tiers").insert(newTier);
    res.status(201).json({ message: "Tier created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// PUT endpoint to edit a tier
app.put("/api/tiers/:id", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { tier, sharedInfo, platforms } = req.body;
    const updatedTier = {
      tier,
      sharedInfo: JSON.stringify(sharedInfo),
      platforms: JSON.stringify(platforms),
    };
    await database("tiers").where({ id }).update(updatedTier);
    res.json({ message: "Tier updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// GET endpoint to fetch all users
app.get("/api/users", verifyJWT, async (req, res) => {
  try {
    const users = await database.select().from("users");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// PUT endpoint to edit a user
app.put("/api/users/:id", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = { name, email };
    await database("users").where({ id }).update(updatedUser);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// GET endpoint to fetch the user's own data
app.get("/api/me", verifyJWT, async (req, res) => {
  try {
    const userId = req.user.id; // The user's ID extracted from the JWT
    const user = await database("users").where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's data (excluding sensitive fields like password)
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phonenumber: user.phonenumber,
      address: user.address,
      credit_card_info: user.credit_card_info,
      date_of_birth: user.date_of_birth,
      mock_data_1: user.mock_data_1,
      mock_data_2: user.mock_data_2,
    };

    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// GET endpoint to fetch all platforms
app.get("/api/platforms", async (req, res) => {
  try {
    const platforms = await database.select().from("platforms");
    res.json(platforms);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// GET endpoint to fetch a platform by ID
app.get("/api/platforms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const platform = await database("platforms").where({ id }).first();

    if (!platform) {
      return res.status(404).json({ error: "Platform not found" });
    }

    res.json(platform);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST endpoint to create a new platform
app.post("/api/platforms", verifyJWT, async (req, res) => {
  try {
    const { name, info_access } = req.body;
    const newPlatform = {
      name,
      info_access: JSON.stringify(info_access),
    };
    await database("platforms").insert(newPlatform);
    res.status(201).json({ message: "Platform created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// PUT endpoint to edit a platform
app.put("/api/platforms/:id", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, info_access } = req.body;
    const updatedPlatform = {
      name,
      info_access: JSON.stringify(info_access),
    };
    await database("platforms").where({ id }).update(updatedPlatform);
    res.json({ message: "Platform updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// DELETE endpoint to delete a platform
app.delete("/api/platforms/:id", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    await database("platforms").where({ id }).del();
    res.json({ message: "Platform deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
