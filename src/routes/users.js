const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

//Rutas de Registro == signUp
router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  const errors = [];
  if (name <= 0) {
    errors.push({ text: " Por favor ingrese su nombre" });
  }
  if (password != confirm_password) {
    errors.push({ text: "La contraseña no coincide" });
  }
  if (password.length < 4) {
    errors.push({ text: "La contraseña debe tener al menos 4 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const correo = { email: email };
    const emailUser = await User.findOne(correo);
    console.log(correo);
    if (emailUser) {
      req.flash("error_msg", "Esta dirección de correo electrónico ya existe");
      res.redirect("/users/signup");
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Cuenta creada exitosamente");
      res.redirect("/users/signin");
    }
  }
});

//Rutas de inicio de sesion = LOGIN = Sigin

router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.post(
  "/users/signin",
  passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })
);

router.get("/users/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
