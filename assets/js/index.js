const btnStart = document.querySelector('.time');
console.log(btnStart.textContent)

const som = document.getElementById('som');
let defaultTime = 25

const buttonTimerRight = document.getElementsByClassName('buttonTimerRight')[0]
buttonTimerRight.addEventListener('click', function(){
  console.log(defaultTime)
  return defaultTime +=5
})
console.log(buttonTimerRight)

class Timer {
  constructor(displayId) {
    this.display = document.querySelector(displayId);
    this.time;
    this.running = false;
    this.interval = null;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.time = defaultTime * 60;
      this.watch();
      this.interval = setInterval(this.watch.bind(this), 1000);
    }
  }

  stop() {
    clearInterval(this.interval);
    this.time = 0;
    this.running = false;
  }

  /*reset() {
    this.stop();
    this.display.textContent = '00';
  }*/

  watch() {
    if (this.time >= 0) {
      const { minutes, seconds } = this.getTimeComponents();
      //console.log(minutes)

      if(this.time >= 60) {
        this.display.textContent = this.formatTime(minutes)
      }else {
        this.display.textContent = seconds
      }
    }
  
    if (this.time <= 0) {
      this.stop();
      this.showAlert();
    } else {
      this.time--;
    }
  }
  getTimeComponents() {
    const minutes = Math.floor((this.time % 3600) / 60);
    const seconds = this.time % 60;
    console.log(minutes, seconds)
    return { minutes, seconds };
  }

  formatTime(time) {
    return String(time).padStart(1, '0');
  }
    /*else{
      return String(time).padStart(2, '0');
    }
  }*/

  showAlert() {
    som.play();
    setTimeout(() => {
      alert('Tempo esgotado!');
      som.pause();
      som.currentTime = 0;
    }, 100);
  }
}

const timer = new Timer('.time');



btnStart.addEventListener('click', timer.start.bind(timer));

const insert = document.getElementsByClassName('insert')[0];
const list = document.getElementsByClassName('list')[0];

insert.onsubmit = function(parameter){
  
  parameter.preventDefault();
  const inputAdd = document.getElementsByClassName('inputAdd')[0];

  if(inputAdd.value.trim() !== ''){
  newTask(inputAdd.value);
  insert.reset();
  }
}

function newTask(description){
  const createDiv = document.createElement("div");
  const createContent = document.createElement("input");
  const createLabel = document.createElement("label");
  const descriptionInput = document.createTextNode(description);

  createContent.setAttribute("type", "checkbox");
  createContent.setAttribute("class", "taskList");
  createContent.setAttribute("name", description);
  createContent.setAttribute("id", description);

  createLabel.setAttribute("for", description);
  createLabel.appendChild(descriptionInput);

  createDiv.classList.add("formItem");
  createDiv.appendChild(createContent);
  createDiv.appendChild(createLabel);
  createDiv.appendChild(descriptionInput);
  
  list.appendChild(createDiv);
}