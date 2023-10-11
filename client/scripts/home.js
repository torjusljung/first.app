let responseDOM = document.getElementById("response")


function getUsers(){
    axios.get('http://localhost:3000')
    .then(function (response) {
      // handle success
      console.log(response.data);
      responseDOM.innerHTML = response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always exxecuted
    });
}

function saveUser(){
  let username = document.getElementById("username").value
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value

  let user = {}

  user.username = username
  user.email = email
  user.password = password

console.log(user);

  axios.post("http://localhost:3000/", user)
    .then(function(response) {
      console.log(response);
      responseDOM.innerHTML = response.data
    })
    .catch(function (error){
      console.log(error);
    })
  
}
async function getWeather() {
    
  const promise = new Promise((resolve, reject) =>{
    setInterval(async () => {
      try {
        const result = await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"
        );
        resolve(result);
        console.log(result);
      } catch(err) {
        reject(err);
      } finally {
      }
    }, 2000);
  })
  console.log(promise);
  return promise
}
getWeather()

const net = require('net');

const client = new net.Socket();

const SERVER_PORT = 3000;
const SERVER_IP = '138.68.102.240'; // Replace with the IP address of your server

function ping() {
  const startTime = process.hrtime();

  client.write('ping');

  client.once('data', (data) => {
    const endTime = process.hrtime(startTime);
    const roundTripTime = (endTime[0] * 1e9 + endTime[1]) / 1e6; // Convert to milliseconds
    console.log(`Round trip time: ${roundTripTime}ms`);
    setTimeout(ping, 1000); // Ping every second
  });
}



