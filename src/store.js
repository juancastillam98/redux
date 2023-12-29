//El store es como el state de la apliación, es obligatorio. Más concretamente como el useContext, es el state global
//LOS THUNKS ES PARA PODER HACER FUNCIONES ASÍNCRONAS, PORQUE REDUX ES POR NATURALEZA SÍNCRONO
//por ejemplo, los thunks se utilizan en las apis, ya que las consultas a las apis son asíncronas.

//ES DECIR, el store es el state global, este state va a tener todos los stados (reducers) de nuestra aplicacion. Cada reducer es un estado

import {applyMiddleware, compose} from "redux";//applyMiddleware es para poder pasarle thunk,
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers"//este es el index, el index combina todos los reducers, así que estamos importando todos los reducers

const store = configureStore({reducer: rootReducer})//le pasamos todos los productos al state
export default store

//desactualizado
/*const store = configureStore({
            reducer,
            compose(applyMiddleware(thunk),
    //código para utilizar redux-developer tools

    typeof window === "object" &&
    typeof window.window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
        ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)
})*/

/*
--actualizado

import { configureStore } from '@reduxjs/toolkit'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const store = configureStore({
        reducer: {
                todos: todosReducer,
                filters: filtersReducer
        }
})

// The thunk middleware was automatically added
*/
