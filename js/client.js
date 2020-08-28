import UI from './UI';
const ui = new UI();
var hora = 0;
var minuto = 0;
var segundo = 0;

document.getElementById('btn-changeDate').addEventListener('click',async (event) => {
    event.preventDefault();
    const anterior = hora + ' : ' + minuto + ' : ' + segundo;
    hora = parseInt(await document.getElementById('hour').value);
    minuto = parseInt(await document.getElementById('minute').value);
    segundo = parseInt(await document.getElementById('second').value);
    ui.renderTable({
        anterior: anterior,
        actual: hora + ' : ' + minuto + ' : ' + segundo
    });
});

function actual() {

    segundo = segundo + 1;
    if (segundo == 60){
            minuto = minuto + 1;
            segundo = 0;
            if(minuto == 60){
                hora = hora + 1;
                minuto = 0;
                if(hora == 24){
                    hora = 0;
                }
            }
        }
    //devolver los datos:
    const mireloj = ((hora < 10 )?'0'+hora:hora) + ' : ' + ((minuto < 10 )?'0'+minuto:minuto) + ' : ' + ((segundo< 10 )?'0'+segundo:segundo);	
    return mireloj; 
    }


    function actualizar() { //función del temporizador
       const mihora=actual(); //recoger hora actual
       const mireloj=document.getElementById("reloj"); //buscar elemento reloj
        mireloj.innerHTML=mihora; //incluir hora en elemento
          }
     setInterval(actualizar,1000); //iniciar temporizador

/*var app = new Vue({
    el: '#app',
    data: {
      time: 'hola',
      startTime: 0,
      messages: [],
      socket: io('http://localhost:3000/clients')
    },
    created: function () {
        this.connect();
    },
    methods: {
        connect: function(){
            let vue = this;
            this.socket.on('time', function(msg){
                vue.messages.push(msg);
            });
        },
        getTime: function () {
            this.startTime = new Date().getTime();
            axios
            .get('http://localhost:3000/time')
            .then(response => {
                let endTime = new Date().getTime();
                const travelTime = (endTime - this.startTime) / 2;
                let newTime = new Date();
                newTime.setHours(response.data.hour);
                newTime.setMinutes(response.data.minutes);
                newTime.setSeconds(response.data.seconds);
                newTime.setTime(newTime.getTime() + travelTime);
                this.time = newTime;
            }
            );
        }
    }
})*/