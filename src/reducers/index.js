//este fichero es el encargado de combinar todos los reducers,
// ya que los reducers han de estar todos juntos en un mismo fichero
import {combineReducers} from "redux";
import productosReducer from "./productosReducer";
import alertaReducer from "./alertaReducer";

//combineReducers al final solamente va a crea 1 reducer
export default combineReducers({
    productos: productosReducer,//todo el reducer de productos pertenece a productos
    alerta: alertaReducer
})