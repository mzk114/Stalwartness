const express = require("express");
const request = require("request");
const app = express();
const port = process.env.port || 5000;
const cors = require("cors");
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const clientsRoute = require("./Routes/Clients");
const machinesRoute = require("./Routes/Equipment/MachinesRoute");
const loadsRoute = require("./Routes/Equipment/LoadsRoute");
const dumbellsRoute = require("./Routes/Equipment/DumbellsRoute");
const barbellsRoute = require("./Routes/Equipment/BarbellsRoute");
const othersRoute = require("./Routes/Equipment/OthersRoute");
const usersRoute = require("./Routes/Users");
const eventsRoute = require("./Routes/Events");
const assortmentRoute = require("./Routes/Assortment");
const workersRoute = require("./Routes/Workers");
const clientsInfoRoute = require("./Routes/ClientsInfo");
const User = require("./Models/Users");

env.config();

mongoose.connect(
  "mongodb+srv://har5shx:fbrzhFxduQnZgQqx@cluster0.nxtuj4t.mongodb.net/?retryWrites=true&w=majority",
  () => console.log("Connected to Database")
);

// fbrzhFxduQnZgQqx

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use("/", clientsRoute);
app.use("/", machinesRoute);
app.use("/", loadsRoute);
app.use("/", dumbellsRoute);
app.use("/", barbellsRoute);
app.use("/", othersRoute);
app.use("/", usersRoute);
app.use("/", eventsRoute);
app.use("/", assortmentRoute);
app.use("/", workersRoute);
app.use("/", clientsInfoRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);

  // Create a test user
  const testUser = new User({
    name: "harsh",
    email: "harsh@mail.com",
    password: "123456@",
  });

  // Save the test user to the database
  testUser.save((err) => {
    if (err) {
      console.error("Error creating test user:", err);
    } else {
      console.log("Test user created successfully");
    }
  });
});
