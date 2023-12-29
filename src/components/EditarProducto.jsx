import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editarProductoAction} from "../actions/productoAction";
import {useNavigate} from "react-router-dom";

//UseSelector --> acceder al state, al contenido
//useDispatch --> mandar ejecutar acciones (acciones de Redux)

export const EditarProducto = () => {

    const [producto, setProducto] =useState({
        nombre: "",
        precio: 0
    })

    //editar producto
    const productoEditar = useSelector((state) => state.productos.productoEditar);//accedo a productoEditar del state productos

    useEffect(()=>{
        if (productoEditar) {
            setProducto(productoEditar);
        }
    }, [])
    //leer datos del formulario, esto es para actualizar los datos de 1 en 1
    const onChangeFormulario=e =>{
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const {nombre, precio}=producto;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitEditarProducto=(e)=>{
        e.preventDefault();
        dispatch(editarProductoAction(producto))
        navigate("/")
    }

    return (
        <div className={"row justify-content-center"}>
            <div className={"col-md-8"}>
                <div className={"card my-5"}>
                    <div className={"card-body"}>
                        <h2 className={"text-center mb-4 font-weight-bold"}>
                            Editar Producto
                        </h2>
                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className={"form-group"}>
                                <label>Nombre producto</label>
                                <input
                                    type="text"
                                    className={"form-control"}
                                    placeholder={"Nombre producto"}
                                    name={"nombre"}
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label>Precio producto</label>
                                <input
                                    type="number"
                                    className={"form-control"}
                                    placeholder={"Nombre producto"}
                                    name={"precio"}
                                    onChange={onChangeFormulario}
                                    value={precio}
                                />
                            </div>

                            <button
                                type={"submit"}
                                className={"mt-3 btn btn-primary font-weight-bold text-uppercase d-block w-100"}
                            >
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}