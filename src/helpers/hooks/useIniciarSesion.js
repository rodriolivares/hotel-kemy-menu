import { useState } from "react"
import clienteAxios from "../config/axios"
import mostrarAlerta from "../utils/mostrarAlerta"

const iniciarSesion = async datos => {
   try {
      const respuesta = await clienteAxios.post('http://challenge-react.alkemy.org/', datos)
      return(respuesta.data.token);
   } catch (error) {
      const title = 'Hubo un error'
      const text = '¡Intenta nuevamente!'
      const icon = 'error'
      mostrarAlerta(title, text, icon)
      return
   }
}
export default iniciarSesion