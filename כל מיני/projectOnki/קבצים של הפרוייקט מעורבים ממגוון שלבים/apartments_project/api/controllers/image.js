
import multer from "multer";

import express from "express";

import Image from "../models/image.js"

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const add =(req, res) => {
  const newImage = new Image({
    data: req.file.buffer,
    contentType: req.file.mimetype,
  });

  newImage.save()
    .then(() => res.status(200).send('Image saved successfully!'))
    .catch(err => res.status(500).send(err));
}
export default add;


