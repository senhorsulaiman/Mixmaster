import React from 'react'

import { Link,useRouteError } from 'react-router-dom'

const SiglePageError = () => {
  const error=useRouteError()
   

    
  return (
   
    <h2>{error.message}</h2>
  )
}

export default SiglePageError