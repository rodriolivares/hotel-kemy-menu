import axios from "axios";
import { useEffect, useState } from "react";
import Buscador from "../Buscador"
import ListadoPlatos from "../ListadoPlatos"
import Spinner from "../Spinner";

const Platos = ({platosMenu, platos, setPlatos, setPlatoSeleccionado, setModal, agregarAlMenu, eliminarPlato}) => {
  const [urlBusqueda, setUrlBusqueda] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if(Object.keys(urlBusqueda).length === 0) return
    const consultarPlatos = async () => {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}${urlBusqueda}`
      const resultado = await axios.get(url)
      setPlatos(resultado.data.results)
    }
    consultarPlatos()
  }, [urlBusqueda])
  
  return (
    <>
      <div className="d-flex modal-header header">
        <Buscador 
          urlBusqueda={urlBusqueda}
          setUrlBusqueda={setUrlBusqueda}
          setCargando={setCargando}
        />
      </div>
      <div>
        {cargando ? <Spinner mensaje={"Buscando Platos"}/> 
        : <ListadoPlatos 
          platosMenu={platosMenu}
          platos={platos}
          setPlatoSeleccionado={setPlatoSeleccionado}
          setModal={setModal}
          agregarAlMenu={agregarAlMenu}
          eliminarPlato={eliminarPlato}
        /> }
      </div>
    </>
  )
}

export default Platos