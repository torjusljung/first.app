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

async function pingForAverageRTT (serverAdress, amount = 10, delay = 500) {
  // Sender en besked til serveren
  const message = 'ping'
  const receivedTimeStamps = [];
  const sendTimeStamps = [];
  
  client.on('message', function (incommingMessage, remote) {
      const receivedTime = Date.now();
      receivedTimeStamps.push(receivedTime);

      // Samler alle svar tider
      const roundTripTimes = []
      receivedTimeStamps.forEach((receivedTime, index) => {
          roundTripTimes.push(receivedTime - sendTimeStamps[index])
      })

      // Udregn gennemsnitlig svartid
      let roundTripTimeSum = 0
      roundTripTimes.forEach((roundTripTime) => {
          roundTripTimeSum += roundTripTime;
      })
      const averageRoundTripTime = roundTripTimeSum / roundTripTimes.length;
      console.log('Received message. Average RTT:', averageRoundTripTime, 'ms');    
  });

  for (let i = 0; i < amount; i++) {
      await asyncTimeout(delay)
      await sendMessage(message, PORT, serverAdress).then(() => { 
          timestamp = Date.now();
          sendTimeStamps.push(timestamp);
          console.log('sent', message, 'at time', timestamp);
      })
  }
}// Send en request og udregn svartiden
function pingForRTT (serverAdress) {
  // Sender en besked til serveren
  const message = 'ping'
  sendMessage(message, PORT, serverAdress).then(() => { 
      timestamp = Date.now();
      console.log('sent', message, 'at time', timestamp);
  })
  
  
  // Udregner svartiden fra serveren ved brug af Date.now()
  // Lytter til svar fra serveren
  client.on('message', function (incommingMessage, remote) {
      console.log('Received', incommingMessage.toString());
      const receivedTime = Date.now();
      const roundTripTime = receivedTime - timestamp;
      console.log('Round trip time:', roundTripTime, 'ms');
  });
}



