window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

let mic = document.getElementById("mic");
let chatareamain = document.querySelector('.chatarea-main');
let chatareaouter = document.querySelector('.chatarea-outer');



let intro = ["Hello, I am Doge : Salaam Sahab"];
let closing = ['Ok bye-bye','As you wish, bye take-care','Bye-bye, see you soon..'];

let birthday = [" you are not famous how do i know"];



mic.addEventListener("click", function(){
    mic.style.background='#39c81f';
    
    dictate();
    console.log("Activated");
})
function showusermsg(usermsg){
    let output = '';
    output += `<div class="chatarea-inner user">${usermsg}</div>`;
    chatareaouter.innerHTML += output;
    return chatareaouter;
}

const dictate = () => {
  recognition.start();
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    chatareamain.appendChild(showusermsg(speechToText));
  

    if (event.results[0].isFinal) {

      if (speechToText.includes('what is the time')) {
          speak(getTime);
      };
      if (speechToText.includes('when is my birthday')) {
        speak(getbirthday);
    };
      if(speechToText.includes('who are you')){
        
        speak(getintro);
      };
      if (speechToText.includes('what is today\'s date')) {
          speak(getDate);
      };
      
      if (speechToText.includes('what is the weather in')) {
          getTheWeather(speechToText);
      };
      if(speechToText.includes('talk to you')){
        
        speak(getend);
      };
    }
  }
}
function showchatbotmsg(chatbotmsg){
    let output = '';
    output += `<div class="chatarea-inner chatbot">${chatbotmsg}</div>`;
    chatareaouter.innerHTML += output;
    return chatareaouter;
}

const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action());
  synth.speak(utterThis);
  chatareamain.appendChild(showchatbotmsg(utterThis.text));
};


const getintro=()=>
{
    const message=intro[Math.floor(Math.random() * intro.length)];
    return message;
};
const getbirthday=()=>
{
    const message=birthday[Math.floor(Math.random() * intro.length)];
    return message;
};
const getend=()=>
{
    const message=closing[Math.floor(Math.random() * closing.length)];
    return message;
};

const getTime = () => {
  const time = new Date(Date.now());
  return `the time is ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
};

const getDate = () => {
  const time = new Date(Date.now())
  return `today is ${time.toLocaleDateString()}`;
};

const getTheWeather = (speech) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=58b6f7c78582bffab3936dac99c31b25&units=metric`) 
  .then(function(response){
    return response.json();
  })
  .then(function(weather){
    if (weather.cod === '404') {
      utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
      synth.speak(utterThis);
      chatareamain.appendChild(showchatbotmsg(utterThis.text));
      return;
    }
    utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
    synth.speak(utterThis);
    chatareamain.appendChild(showchatbotmsg(utterThis.text));
  });
};

recognition.onend=function(){
    mic.style.background="#ff3b3b";
}
