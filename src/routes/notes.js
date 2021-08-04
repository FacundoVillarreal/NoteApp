const express = require("express");
const router = express.Router();
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

const Note = require("../models/Notes");
const { isAuthenticated } = require("../helpers/auth");

router.get("/notes/add", isAuthenticated, (req, res) => {
  res.render("notes/new-note");
});
router.post("/notes/new-note", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Por favor escriba un título" });
  }
  if (!description) {
    errors.push({ text: "Por favor escriba una descripción" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Nota agregada con éxito");
    res.redirect("/notes");
  }
});

router.get("/notes", isAuthenticated, async (req, res) => {
  await Note.find({ user: req.user.id })
    .sort({ date: "desc" })
    .then((documentos) => {
      const contexto = {
        notes: documentos.map((documento) => {
          return {
            title: documento.title,
            description: documento.description,
            _id: documento._id,
          };
        }),
      };
      res.render("notes/all-notes", {
        notes: contexto.notes,
        name: req.user.name,
      });
    });
});

router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render("notes/edit-note", {
    title: note.title,
    description: note.description,
    id: note._id,
  });
});

router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    title: title,
    description: description,
  });
  req.flash("success_msg", "Nota actualizada con éxito");
  res.redirect("/notes");
});
router.delete("/notes/delete-note/:id", isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Nota eliminada con éxito");
  res.redirect("/notes");
});

function enviarMensaje(mensaje){
  client.messages.create({
    from: 'whatsapp:+14155238886',
    body: mensaje,
    to: 'whatsapp:+5493517518362'
  }).then(message => console.log(message.sid));
};

/* Enviar por wapp */
router.get("/notes/send/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id);
  let titulo = new String( note.title).toString();
  let mensaje = new String(note.description).toString();

  enviarMensaje('Titulo de la nota: '+ titulo +'\n Descripción: ' + mensaje );
  res.redirect("/notes");
});
module.exports = router;
