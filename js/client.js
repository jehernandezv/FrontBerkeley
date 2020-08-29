var socket =  io('http://localhost:3000');
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
       const mihora=actual(); //recoger hora
       const mireloj=document.getElementById("reloj"); //buscar elemento reloj
        mireloj.innerHTML=mihora; //incluir hora en elemento
          }
     setInterval(actualizar,1000); //iniciar temporizador


     socket.on('req:time' , function(){
        socket.emit('hour:client', {
            hour:hora,
            min:minuto
        });
     });

     socket.on('res:time',(data) => {
            console.log(data);
     });