import useWindowDimensions from "../../helpers/hooks/useWindowDimension";
import ListadoPlatos from "../ListadoPlatos";
import DetallesMenu from "../DetallesMenu";
import Platos from "./Platos"

const Menu = ({platosMenu, setPlatosMenu, menuInfo, platos, setPlatos, platoSeleccionado, setPlatoSeleccionado, setModal, agregarAlMenu, eliminarPlato}) => {
  const [ isMobile ] = useWindowDimensions(767)
  return (
    <div className="container-lg">
      <div className="row mt-3">
        <div className="shadow rounded-3 mx-2 col bg-white">
          { !isMobile ? 
            <h2 className="mt-2">Tu menú</h2>
          : null }
          <div className="d-flex flex-column bd-highlight mb-3">
            { platosMenu.length ? 
            <>
              <ListadoPlatos 
                isMenu={true}
                platosMenu={platosMenu}
                setPlatoSeleccionado={setPlatoSeleccionado}
                setModal={setModal}
                eliminarPlato={eliminarPlato}
              />
              <DetallesMenu 
                menuInfo={menuInfo}
              />
              <div className={`${isMobile ? "order-0" : "order-3"}  bd-highlight`}>
                <div className={`d-flex justify-content-${isMobile ? "between" : "end"}`}>
                  { !isMobile && <button className="btn btn-primary">Pedir este menú <span>($4000)</span></button> }
                </div>
              </div>
            </> : <p>Aun no has agregado ningun plato. Comienza buscando uno.</p> }
            
          </div>
        </div>
        { !isMobile ? 
          <div className="shadow rounded-3 mx-2 col bg-white">
            <div className="mt-3">
              <Platos 
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
            </div>
          </div>
        : null }
      </div>
    </div>
  )
}

export default Menu