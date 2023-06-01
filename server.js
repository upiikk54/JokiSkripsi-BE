const express = require("express");
const app = express();
const PORT = 8811;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// ------------------- Import Controller ------------------- //
const authController = require('./controllers/authController')
// ------------------- End Import Controller ------------------- //

// ------------------- Import Controller ------------------- //
const middlewares = require('./middlewares/auth')
// ------------------- End Import Controller ------------------- //

// ------------------- Define Routes Auth ------------------- //
app.post("/v1/auth/register", authController.handleRegister);
app.post("/v1/auth/login", authController.handleLogin);
app.get("/v1/auth/me",middlewares.authenticate, authController.currentUser);
// ------------------- End Define Routes Auth ------------------- //

// ------------------- Listen Server ------------------- //
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`);
});
// ------------------- End Listen Server ------------------- //