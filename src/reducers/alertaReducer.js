import {
    MOSTRAR_ALERTA,
    OCULAR_ALERTA
} from "../types";

//Cada reducer tiene su state
const initialState = {
    alerta: null
}
//en caso de que no se le pase state, su valor va a ser el initialState
export default function(state=initialState, action) {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                alerta: action.payload
            }
        case OCULAR_ALERTA:
            return {
                ...state,
                alerta: null
            }
        default:
            return state;
    }
}
