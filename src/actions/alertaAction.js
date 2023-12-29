import {
    MOSTRAR_ALERTA,
    OCULAR_ALERTA
} from "../types";

//Myestra una alerta
export function mostrarAlertaAction(alerta) {//va a recibir un obj
    return (dispatch)=>{
        dispatch (crearAlerta(alerta));
    }
}
const crearAlerta = (alerta)=>({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

//oculata alerta
export function ocultarAlertaAction(){
    return (dispatch)=>{
        dispatch (ocultarAlerta())
    }
}
const ocultarAlerta = ()=>({
    type: OCULAR_ALERTA,
})