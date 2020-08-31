var socket = io('http://localhost:3000');
import UI from './UI';
const ui = new UI();
var hora = 0;
var minuto = 0;
var segundo = 0;

document.getElementById('btn-changeDate').addEventListener('click', async (event) => {
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
    if (segundo == 60) {
        minuto = minuto + 1;
        segundo = 0;
        if (minuto == 60) {
            hora = hora + 1;
            minuto = 0;
            if (hora == 24) {
                hora = 0;
            }
        }
    }
    //devolver los datos:
    const mireloj = ((hora < 10) ? '0' + hora : hora) + ' : ' + ((minuto < 10) ? '0' + minuto : minuto) + ' : ' + ((segundo < 10) ? '0' + segundo : segundo);
    return mireloj;
}

function actualizar() { //función del temporizador
    const mihora = actual(); //recoger hora
    const mireloj = document.getElementById("reloj"); //buscar elemento reloj
    mireloj.innerHTML = mihora; //incluir hora en elemento
}
setInterval(actualizar, 1000); //iniciar temporizador

function convertTimeToSeconds() {
    let seconds = 0;
    seconds += hora * 3600;
    seconds += minuto * 60;
    seconds += segundo;
    return seconds;
}

function convertSecondsToTime(seconds) {
    hora = Math.trunc(seconds / 3600);
    console.log("horas " + hora);
    seconds -= hora * 3600;

    minuto = Math.trunc(seconds / 60);
    console.log("minutos " + minuto);
    seconds -= minuto * 60;

    segundo = Math.trunc(seconds);
    console.log("segundos " + segundo);
}

socket.on('req:time', function () {
     socket.emit('hour:client', {
        timeClient: convertTimeToSeconds(),
        id_socket: socket.id
    });
});

socket.on('res:time', (data) => {
    console.log(data.offset);
    const time = data.offset;
    convertSecondsToTime(time);
});

const reloj = document.getElementById('clock');
var dialLines = document.getElementsByClassName('diallines');
var clockEl = document.getElementsByClassName('reloj')[0];

for (var i = 1; i < 60; i++) {
  clockEl.innerHTML += "<div class='diallines'></div>";
  dialLines[i].style.transform = "rotate(" + 6 * i + "deg)";
}

function fijarAgujas() {

	const ahora = new Date();
	const horas = ((hora + 11) % 12 + 1);
	const minutos = minuto;
	const segundos = segundo;
	const horario = document.querySelector('.horario');
	const minutero = document.querySelector('.minutero');
	const segundero = document.querySelector('.segundero');
	const gradosHora = horas * 30 + minutos * (360/720); // * 360 / 12
	horario.style.transform = `rotate(${gradosHora}deg)`;
	const gradosMinutos = minutos * 6 + segundos * (360/3600); // *360 / 60
	minutero.style.transform = `rotate(${gradosMinutos}deg)`;
	const gradosSegundos = segundos * 6;
	if(gradosSegundos === 90) {
        segundero.style.transition = 'none'
    } else {
        segundero.style.transition = ''
    }
    console.log("HORA: " + horas + ' MINUTO: ' + minutos + ' SEGUNDO: ' + segundos);
	segundero.style.transform = `rotate(${gradosSegundos}deg)`;
	reloj.style.display = "block";
}

setInterval(fijarAgujas, 1000);
