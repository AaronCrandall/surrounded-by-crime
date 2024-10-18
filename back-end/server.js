import express from "express";
import cors from "cors";
import crimes from "./routes/crime.js";
import session from "express-session";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// app.use(session({
//   secret: 'rtysrtjjrtwertw45t',
//   resave: false,
//   saveUninitialized: false,
//   store: new MongoStore({mongoUrl: process.env.ATLAS_URI}),
//   cookie: {maxAge: 600000}
// }));

app.use("/crime", crimes);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
