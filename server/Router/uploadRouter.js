const express = require('express');
const router = express.Router();
const { upload } = require('../upload.config');
const path = require('path');

router.post('/', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const fileUrl = `http://localhost:${process.env.PORT}/uploads/${path.basename(filePath)}`;
  res.json({ url: fileUrl });
});

module.exports = router;
