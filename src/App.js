// app.jsx
import {Header} from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Productos} from "./components/Productos";
import {NuevoProducto} from "./components/NuevoProducto";
import {EditarProducto} from "./components/EditarProducto";


//Redux
import {Provider} from "react-redux";//redux tiene su propio provider
import store from "./store";
function App() {
    return (
        <>
            <BrowserRouter>
                <Provider store={store}>
                    <Header/>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/"} element={<Productos />} />
                            <Route path={"/productos/nuevo"} element={<NuevoProducto />} />
                            <Route path={"/productos/editar/:id"} element={<EditarProducto />} />
                        </Routes>
                    </div>
                </Provider>

            </BrowserRouter>
        </>
    );
}

export default App;
