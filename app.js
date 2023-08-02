// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const projectFolderPath = path.join(__dirname, 'project');

app.use(express.static('public'));

app.get('/', (req, res) => {
  // Serve the index.html file when root path is accessed
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/files', (req, res) => {
  // Read the files from the project folder and send the list as JSON
  fs.readdir(projectFolderPath, (err, files) => {
    if (err) {
      console.error('Error reading files:', err);
      res.status(500).send('Error reading files.');
    } else {
      res.json(files);
    }
  });
});

app.get('/file/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(projectFolderPath, fileName);

  // Read the file content and send it as plain text
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading file.');
    } else {
      res.send(data);
    }
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});