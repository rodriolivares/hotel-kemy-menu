import React from 'react'

const DetallesMenu = ({menuInfo}) => {
  const { healthScoteTotal, tiempoMaxPreparacion,precioTotal } = menuInfo
  return (
    <div className="p-2 order-2 bd-highlight">
      <p className="col text-start"><span>Tiempo: </span>{tiempoMaxPreparacion}</p>
      <p className="col text-start"><span>Health Score: </span>{healthScoteTotal}</p>
      <p className="col text-start"><span>Precio total: </span>{`$${precioTotal}`}</p>
    </div>
  )
}

export default DetallesMenu