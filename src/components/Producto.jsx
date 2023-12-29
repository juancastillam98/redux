import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

//redux
import {useDispatch} from "react-redux";
import {borrarProductoAction, obtenerProductosEditarAction} from "../actions/productoAction";
export const Producto = ({producto}) => {
    const {nombre, precio, id} = producto;
    const dispatch = useDispatch();
    //const history = useHistory();
    const navigate = useNavigate();

    //confirmar si desea eliminarlo
    const confirmarEliminarProducto=id =>{

        Swal.fire({
            title: "Estás seguro?",
            text: "Esta acción no se podrá revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, ¡Eliminar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                //pasarlo al action
                dispatch(borrarProductoAction(id))

            }
        });

    }
    //función que redirige de forma programada
    const redireccionarEdicion = producto =>{
        dispatch(obtenerProductosEditarAction(producto))
        navigate(`/productos/editar/${producto.id}`)
    }
    return (
        <tr>
            <td>{nombre}</td>
            <td> <span className={"font-weight-bold"}>$</span> {precio}</td>
            <td className={"acciones"}>
                <button
                    type={"button"}
                    onClick={()=>redireccionarEdicion(producto)}
                    className={"btn btn-primary mr-2"}>
                    Editar
                </button>
                <button
                    type={"button"}
                    className={"btn btn-danger"}
                    onClick={()=>confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}