import {useState} from "react";
//Actions de redux
import {crearNuevoProductoAction} from "../actions/productoAction";
import {useDispatch, useSelector} from "react-redux";//useSelector para acceder al state del componente
import { mostrarAlertaAction, ocultarAlertaAction} from "../actions/alertaAction";
import {useNavigate} from "react-router-dom";

export const NuevoProducto = () => {//history solo está disponible si instalamos react router dom
    //state del componente
    const [nombre, guararNombre] =useState("")
    const [precio, guardarPrecio] =useState(0)

    //tenemos que utilizar una función de redux que mande ejecutar el action
    //useDispachar y crea una funcion
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //mandar llamar el action de crearNuevoProducto.  la cual inserta un nuevo producto en la bd
    const agregarProducto =(producto)=>dispatch(crearNuevoProductoAction(producto))

    //acceder al state del store
    const cargando = useSelector((state)=>state.productos.loading)//devolvemos el loading del state
    const error = useSelector(state => state.productos.error)//devolvemos el mensaje de error del state
    const alerta = useSelector(state => state.alerta.alerta)
    const submitNuevoProducto=e=>{
        e.preventDefault();
        //validar formulario
        if (nombre.trim() ==="" || precio <=0){
            const alerta = {
                msg: "Ambos campos son obligatorios",
                clases: "alert alert-danger text-center text-uppercase p3"
            }
           dispatch( mostrarAlertaAction(alerta))
            return;
        }

        dispatch(ocultarAlertaAction())

        //crear nuevo producto
        agregarProducto({nombre, precio});

        //redireccionar
        navigate("/")//redirecciono a la página principal
    }

    return (
        <div className={"row justify-content-center"}>
            <div className={"col-md-8"}>
                <div className={"card my-5"}>
                    <div className={"card-body"}>
                        <h2 className={"text-center mb-4 font-weight-bold"}>
                            Agregar nuevo producto
                        </h2>
                        {alerta? <p className={alerta.clases}>{alerta.msg}</p> : null}
                        <form

                            onSubmit={submitNuevoProducto}
                        >
                            <div className={"form-group"}>
                                <label>Nombre producto</label>
                                <input
                                    type="text"
                                    className={"form-control"}
                                    placeholder={"Nombre producto"}
                                    name={"nombre"}
                                    value={nombre}
                                    onChange={e => guararNombre(e.target.value)}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label>Precio producto</label>
                                <input
                                    type="number"
                                    className={"form-control"}
                                    placeholder={"Nombre producto"}
                                    name={"precio"}
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type={"submit"}
                                className={"mt-3 btn btn-primary font-weight-bold text-uppercase d-block w-100"}
                            >
                                Agregar
                            </button>
                            {cargando ? <p>Cargando...</p> : null}
                            {error ? <p className={"alert alert-danger p-2 mt-4 text-center"}>Hubo un error</p> : null}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}