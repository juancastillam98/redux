//este fichero es el encargado de establer los tipos de órdenes e inserciones en la bd
//recuerda, este fichero no actualiza el state, no está comunicado con el reducer sino con la bd
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTO,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from "../types";

import {clienteAxios} from "../config/axios"
import Swal from "sweetalert2";

// este actión es el encargado de insertar en la bd y actualizar el state
export function crearNuevoProductoAction(producto){
    return async (dispatch)=>{
        dispatch(agregarProducto())//devolvemos una orden (llamada a la función agregar producto)
        try {
            //insertar en la API
            await clienteAxios.post("/productos", producto)

            //si todo sale bien
            dispatch(agregarProductoExito(producto))
            //Alerta
            Swal.fire(
                "Correcto",
                "El producto se agregó correctamente",
                "success"
            )
        }catch (error){
            console.log(error)

            dispatch(agregarProductoError(true))
            //Alerta
            Swal.fire({
                icon: "error",
                title: "Hubo un error",
                text: "Hubo un error inténtalo de nuevo"
            })
        }
    }
}
//recuerda: dispatch es quien manda ejecutar las acciones, payload es quien actualiza el state

const agregarProducto = ()=>({
    type: AGREGAR_PRODUCTO,
    // payload, no es necesario porque no moficamos el state
})
const agregarProductoExito =producto =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto//payload lo tenemos que poner porque modificamos el state. Indicamos qué modificamos, en este caso el array de producto
})
const agregarProductoError =estado =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado//payload lo tenemos que poner porque modificamos el state, le pasamos lo que estamos modificando
})

//función que descarga los productos del bd
export function obtenerProductosAction(){
    return async (dispatch)=>{
        dispatch (descargarProductos())
        try {
            const respuesta = await clienteAxios.get("/productos")
            dispatch(descargarProductosExitosa(respuesta.data))
        }catch (error) {
            console.log(error)
            dispatch(descargarProductosError())
        }
    }
}
const descargarProductos=()=>({
    type: COMENZAR_DESCARGA_PRODUCTO,
    payload: true
})
const descargarProductosExitosa =productos=>({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos//mandamos actualizar los productos
})
const descargarProductosError = ()=>({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//Seleciona y elimina un producto.
export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito())

            //Si se elimina mostrar alerta
            Swal.fire({
                title: "¡Eliminado!",
                text: "El producto se eliminó correctamente.",
                icon: "success"
            });
        }catch (error) {
            console.error(error)
            dispatch(eliminarProductoError())
        }
    }
}
const obtenerProductoEliminar=id => ({
    type: PRODUCTO_ELIMINAR,
    payload: id//le pasamos como payload la referencia del obj a eliminar
})
const eliminarProductoExito=()=>({
    type: PRODUCTO_ELIMINADO_EXITO
})
const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

//Colocar producto en activo, es decir, rellenar los datos del formulario
export function obtenerProductosEditarAction(producto){
    return (dispatch)=>{
        dispatch(obtenerProductoEditar(producto))
    }
}
const obtenerProductoEditar = producto =>({//esta función es para llenar el state
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})
//Edita un registro en la API y en el state, se llama esta función al hacer submit
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto())
        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch(editarProductoExito(producto))
        } catch (error) {
            dispatch(editarProductoError())
        }
    }
}
const editarProducto = () =>({
    type: COMENZAR_EDICION_PRODUCTO,
})
const editarProductoExito = (producto)=>({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})
const editarProductoError = ()=>({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})