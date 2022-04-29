import React, { useState } from 'react'
import Parrafo from "../Parrafo"
import Spinner from "../Spinner"

const DetallePlato = ({setModal, cargando, detallePlatoSeleccionado, agregarAlMenu}) => {
  const [plato, setPlato] = useState({})
  const { id, image, title, summary, healthScore, readyInMinutes, pricePerServing, vegan } = detallePlatoSeleccionado
	const ocultarModal = () => {
    setModal(false)
  }
  const handleClick = () => {
    const plato = {
       id: id,
       title: title,
       image: image,
       healthScore: healthScore,
       tiempo: readyInMinutes,
       precio: pricePerServing,
       vegan: vegan
    }
    agregarAlMenu(plato)
    setModal(false)
  }
  return (
    <div className="position-absolute top-100 start-50 translate-middle">
      <div className="modal-dialog modal-dialog-centered">
        {cargando ? <Spinner /> :
          <div className="modal-content">
            <div className="card-header">
              <img src={image} className="card-img-top" alt="..."/>
            </div>
            <div className="card-body" data-bs-spy="scroll">
              <h5 className="card-title">{title}</h5>
              <Parrafo>{`Este es un plato ${vegan ? "Vegano" : "No Vegano"}`}</Parrafo>
              <Parrafo>{summary}</Parrafo>
              <Parrafo>{`Health Score: ${healthScore}`}</Parrafo>
              <Parrafo>{`Tiempo de Preparacion: ${readyInMinutes}`}</Parrafo>
              <Parrafo>{`Precio: $${pricePerServing}`}</Parrafo>
            </div>
            <div className="card-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={ocultarModal}
                >Volver</button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => handleClick()}
              >Agregar a menu</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default DetallePlato