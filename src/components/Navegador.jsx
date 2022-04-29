import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";

const Navegador = () => {
   const location = useLocation()
   const [ruta, setRuta] = useState(location.pathname)
   useEffect(() => {
     setRuta(location.pathname)
   }, [location.pathname])
   return (
      <nav className="navbar">
         { ruta === "/menu" && 
            <div className="d-flex justify-content-between">
               <Link 
                  className="btn btn-primary bg-white mb-1 fs-6"
                  to="/menu/platos"
               >Buscar</Link>
               <button className="btn btn-primary bg-white mb-1 fs-6">Pedir este menú</button>
            </div> }
         { ruta === "/menu/platos" && 
            <div>
               <Link 
                  className="btn btn-primary d-flex bg-white mb-1 fs-6"
                  to="/menu" 
               >Volver a mi menú</Link>
            </div> } 
      </nav>
   )
}

export default Navegador