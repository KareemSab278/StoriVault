const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser"); // import diabetes-parser
const jwt = require("jsonwebtoken");

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = [
  'https://storivault.pages.dev',
  'http://localhost:5173',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser()); // i need this for cookie parsing

// route starts with / and uses the routes defined in routes.js
app.use("/", require("./routes/Routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
