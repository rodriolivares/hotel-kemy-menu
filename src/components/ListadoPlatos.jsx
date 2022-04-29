import Plato from "./Plato"
import PlatoMenu from "./PlatoMenu"

const ListadoPlatos = ({isMenu, platosMenu, platos, setPlatoSeleccionado, setModal, agregarAlMenu, eliminarPlato}) => {
   return (
      <div className="mb-2 order-1 bd-highlight">
         {isMenu ? ( platosMenu.map( platoM => ( 
            <PlatoMenu 
               key={platoM.id}
               platoM={platoM}
               setPlatoSeleccionado={setPlatoSeleccionado}
               setModal={setModal}
               eliminarPlato={eliminarPlato}
            />
         ))) : ( platos.map( plato => ( 
            <Plato 
               key={plato.id}
               plato={plato}
               setPlatoSeleccionado={setPlatoSeleccionado}
               setModal={setModal}
               agregarAlMenu={agregarAlMenu}
            />
         )))}
      </div>
   )
}
export default ListadoPlatos