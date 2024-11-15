import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const Data = () =>{
    const[users,setUsers] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/data1')
        .then(res =>{
            setUsers(res.data);
        })
    },[]);
    return(
        <li>
            {users.map(user=>(
                <div key={user.id}>
                    <p>{user.name}</p>
                    <p>{user.description}</p>
                    <p>{user.price}</p>
                </div>
            ))}
        </li>
    )    
}