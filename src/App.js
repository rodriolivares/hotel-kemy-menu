import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import * as bootstrap from 'bootstrap';
import Login from "./components/Layout/Login";
import LoginForm from "./components/pages/LoginForm";
import Layout from "./components/Layout/Layout";
import Menu from "./components/pages/Menu";
import Platos from "./components/pages/Platos";
import DetallePlato from "./components/pages/DetallePlato";
import { useEffect, useState } from "react";
import axios from "axios";
import mostrarAlerta from "./helpers/utils/mostrarAlerta"

function App() {
  const [platos, setPlatos] = useState([])
  const [platoSeleccionado, setPlatoSeleccionado] = useState('')
  const [platosMenu, setPlatosMenu] = useState([])
  const [veganosRestantes, setVeganosRestantes] = useState(2)
  const [noVeganosRestantes, setNoVeganosRestantes] = useState(2)
  const [menuInfo, setMenuInfo] = useState({
    healthScoteTotal: 0,
    tiempoMaxPreparacion: 0,
    precioTotal: 0
  })
  const [detallePlatoSeleccionado, setDetallePlatoSeleccionado] = useState({})
  const [cargando, setCargando] = useState(false)
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if(!platoSeleccionado) return
    const consultarPlatos = async () => {
      setCargando(true)
      const url = `https://api.spoonacular.com/recipes/${platoSeleccionado}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      const resultado = await axios.get(url)
      setDetallePlatoSeleccionado(resultado.data)
    }
    consultarPlatos()
    setTimeout(() => {
      setCargando(false)
    }, 1500);
  }, [platoSeleccionado])

  const agregarAlMenu = plato => {
    if(platosMenu.some(p => p.id === plato.id)) {
      mostrarAlerta('Error', 'Ya seleccionaste este plato', 'error')
      return
    } else {
      if (plato.vegan) {
        if(veganosRestantes === 0) {
        mostrarAlerta('Error', 'Ya seleccionaste 2 platos veganos', 'error')
        return
        } else { setVeganosRestantes(veganosRestantes - 1)
        }
      } else {
        if(noVeganosRestantes === 0) {
          mostrarAlerta('Error', 'Ya seleccionaste 2 platos no veganos', 'error')
          return
        } else { setNoVeganosRestantes(noVeganosRestantes - 1)
        }
      }
      // const platosMenuActualizado = [...platosMenu,  plato]
      const healthScoteTotal= menuInfo.healthScoteTotal + plato.healthScore
      const tiempoMaxPreparacion= menuInfo.tiempoMaxPreparacion + plato.tiempo
      const precioTotal= menuInfo.precioTotal + plato.precio
      const menuActualizado = {healthScoteTotal, tiempoMaxPreparacion, precioTotal}
      
      setPlatosMenu([...platosMenu, plato])
      setMenuInfo(menuActualizado)
    }
  }

  const eliminarPlato = id => {
    const platoEliminar = platosMenu.filter( plato => plato.id === id)
    if (platoEliminar[0].vegan) {
      setVeganosRestantes(veganosRestantes + 1)
    } else { 
      setNoVeganosRestantes(noVeganosRestantes + 1 )  
    }
    const healthScoteTotal= menuInfo.healthScoteTotal - platoEliminar[0].healthScore
    const tiempoMaxPreparacion= menuInfo.tiempoMaxPreparacion - platoEliminar[0].tiempo
    const precioTotal= menuInfo.precioTotal - platoEliminar[0].precio
    const menuInfoActualizada = {healthScoteTotal, tiempoMaxPreparacion, precioTotal}
    setMenuInfo(menuInfoActualizada)
    const menuActualizado = platosMenu.filter( plato => plato.id !== id)
    setPlatosMenu(menuActualizado)
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route index element={<LoginForm />} />
          </Route>
          <Route path="/menu" element={<Layout />}>
            <Route index element={ 
              <Menu 
                platosMenu={platosMenu}
                setPlatosMenu={setPlatosMenu}
                menuInfo={menuInfo}
                platos={platos}
                setPlatos={setPlatos}
                platoSeleccionado={platoSeleccionado}
                setPlatoSeleccionado={setPlatoSeleccionado}
                setModal={setModal}
                agregarAlMenu={agregarAlMenu}
                eliminarPlato={eliminarPlato}
              /> 
            } />
            <Route path="platos" element={
              <Platos 
                platosMenu={platosMenu}
                platos={platos}
                setPlatos={setPlatos}
                setPlatoSeleccionado={setPlatoSeleccionado}
                setModal={setModal}                agregarAlMenu={agregarAlMenu}
                eliminarPlato={eliminarPlato}
              />
            }/> 
          </Route>
        </Routes>
      </Router>
      {modal && <DetallePlato
          setModal={setModal}
          cargando={cargando}
          detallePlatoSeleccionado={detallePlatoSeleccionado}
          agregarAlMenu={agregarAlMenu}
        />}
    </>
  );
}

export default App;
