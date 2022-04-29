import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header";
import Navegador from "../Navegador";
import useWindowDimensions from "../../helpers/hooks/useWindowDimension";
import Spinner from "../Spinner";

const Layout = () => {
   const [cargando, setCargando] = useState(null)
   const [token, setToken] = useState(sessionStorage.getItem('token'))
   let history = useNavigate()
   useEffect(() => {
      setCargando(true)
      setTimeout(() => {
         if(!token) {
            history('/')
         }
         setCargando(false)
      }, 1500);
   }, [])
   const [ isMobile ] = useWindowDimensions(767)
   return (
      <>
         { cargando ? <Spinner mensaje={"Cargando"}/> 
         : <>
            <div className="modal-header header">
               { isMobile ? 
                  <Navegador />
               :  <Header titulo='Agrega 4 platos a tu menú: 2 veganos y 2 no veganos' /> }
            </div> 
            <Outlet />
         </> }
      </>
   )
}

export default Layout