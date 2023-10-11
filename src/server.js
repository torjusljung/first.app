const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const axios = require("axios");

const app = express();
const port = 3000

let id = 1
let db = []

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "../client")))


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/home.html"));
})

app.get("/home.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/scripts/home.js"));
})

app.get("/global.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/styles/global.css"));
})


app.get('/getWeather', async (req, res) => {
  const apiUrl =
    'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m'
  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      const data = response.data;
      res.json(data); // Send the API data as a JSON response
    } else {
      res.status(500).json({ error: 'Failed to retrieve data from the API.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from the API.' });
  }
});



app.listen(port, () => {
  console.log(`Server open on port ${port}`);
});
 
// server.js
const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const message = data.toString().trim();
    if (message === 'ping') {
      socket.write('pong\n');
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
