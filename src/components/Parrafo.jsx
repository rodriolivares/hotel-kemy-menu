import React from 'react'

const Parrafo = ({children}) => {
  return (
    <div className="card-text">
      <p>
        {children}
      </p>
    </div>
  )
}

export default Parrafo