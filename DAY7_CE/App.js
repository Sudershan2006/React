import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function App() {
  const [data,setData] = useState([{}])

  useEffect(()=>{
    try{
      Axios.get('http://localhost:3000/users')
      .then((response )=> {
        setData(response.data)
      }
      )
    }
    catch (e) {
      console.log(e);
    }
  },[])
  
  return (
    <div>
      {data.length>0 && data.map((value,key)=>(
        <div key={value.id}>{value.name}
        </div>
      ))}
    </div>
  )
}

export default App
