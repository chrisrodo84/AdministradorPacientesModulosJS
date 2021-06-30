import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import {mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario} from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();
let editando;

//Objeto con información
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Agregar datos al objeto
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

export function nuevaCita(e) {
    e.preventDefault();

    //Se extrae la información del objeto
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    if (editando) {
        ui.imprimirAlerta('La cita se modificó correctamente', 'correcto');
        //Pasar el objeto de la cita a edición
        administrarCitas.editarCita({...citaObj});
        //Se regresa el texto del botón
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        //Se quita el modo edición
        editando = false;
    } else {
        //Se le genera un id al objeto
        citaObj.id = Date.now();
        //Se crea la cita
        administrarCitas.agregarCita({...citaObj});
        //Mostrar mensaje de agregado
        ui.imprimirAlerta('La cita se agregó correctamente', 'correcto');
    }
    
    //Se reinicia el formulario y el objeto
    reiniciarObjeto();
    formulario.reset();
    //Se muestra la cita en el HTML
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    //Eliminar cita
    administrarCitas.eliminarCita(id);
    //Mostrar el mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente', 'correcto');
    //Refrescar citas
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    //Llenar los inputs con los datos
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value =telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
    //Se llena el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;
    //Cambiar el texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
    editando = true;
}