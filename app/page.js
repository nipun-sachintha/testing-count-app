'use client'

import React, { useEffect,useRef,useState } from 'react';




export default function Home() {
  const socket = useRef(null)
  const [devices,setDevices]= useState([
    {
        "id": 1,
        "active": false,
        "serial": "a1",
        "device": null,
        "line_output": false,
        "count": 17,
        "cycles": 0,
        "operation_division": 2.0,
        "min_stitch": 15,
        "max_stitch": 40,
        "production_line": null
    },
    {
        "id": 2,
        "active": false,
        "serial": "G2Z57449",
        "device": {
            "id": 6,
            "serial": "90380c8bdd58",
            "name": "6"
        },
        "line_output": false,
        "count": 10,
        "cycles": 0,
        "operation_division": 2.0,
        "min_stitch": 11,
        "max_stitch": 19,
        "production_line": null
    },
    {
        "id": 3,
        "active": false,
        "serial": "957127",
        "device": {
            "id": 3,
            "serial": "83af250b398",
            "name": "3"
        },
        "line_output": true,
        "count": 0,
        "cycles": 0,
        "operation_division": 1.0,
        "min_stitch": 300,
        "max_stitch": 700,
        "production_line": 2
    },
    {
        "id": 4,
        "active": false,
        "serial": "G2Z57478",
        "device": {
            "id": 5,
            "serial": "90380c8bdd4c",
            "name": "5"
        },
        "line_output": false,
        "count": 0,
        "cycles": 0,
        "operation_division": 1.0,
        "min_stitch": 22,
        "max_stitch": 24,
        "production_line": 4
    },
    {
        "id": 5,
        "active": false,
        "serial": "E2Z30851",
        "device": {
            "id": 7,
            "serial": "90380c8bdd34",
            "name": "12"
        },
        "line_output": false,
        "count": 0,
        "cycles": 0,
        "operation_division": 1.0,
        "min_stitch": 20,
        "max_stitch": 22,
        "production_line": 2
    },
    {
        "id": 6,
        "active": false,
        "serial": "1126276",
        "device": {
            "id": 2,
            "serial": "9c9c1fe9d3e0",
            "name": "2"
        },
        "line_output": false,
        "count": 342,
        "cycles": 0,
        "operation_division": 1.0,
        "min_stitch": 400,
        "max_stitch": 800,
        "production_line": null
    },
    {
        "id": 7,
        "active": false,
        "serial": "G2Z57324",
        "device": {
            "id": 9,
            "serial": "70b8f623ca30",
            "name": "7"
        },
        "line_output": false,
        "count": 0,
        "cycles": 0,
        "operation_division": 1.0,
        "min_stitch": 10,
        "max_stitch": 25,
        "production_line": 2
    },
    {
        "id": 8,
        "active": false,
        "serial": "E2730721",
        "device": {
            "id": 10,
            "serial": "90380c8bdd8c",
            "name": "13"
        },
        "line_output": false,
        "count": 0,
        "cycles": 0,
        "operation_division": 1.0,
        "min_stitch": 20,
        "max_stitch": 22,
        "production_line": 3
    },
    {
        "id": 9,
        "active": false,
        "serial": "E2Z30848",
        "device": {
            "id": 11,
            "serial": "90380c8bdd38",
            "name": "11"
        },
        "line_output": false,
        "count": 0,
        "cycles": 0,
        "operation_division": 1.0,
        "min_stitch": 20,
        "max_stitch": 22,
        "production_line": 2
    },
    {
        "id": 10,
        "active": false,
        "serial": "971538",
        "device": {
            "id": 1,
            "serial": "58bf259ec074",
            "name": "1"
        },
        "line_output": false,
        "count": 0,
        "cycles": 0,
        "operation_division": 1.0,
        "min_stitch": 200,
        "max_stitch": 1000,
        "production_line": 2
    },
    {
        "id": 11,
        "active": false,
        "serial": "1126271",
        "device": {
            "id": 4,
            "serial": "58bf25171164",
            "name": "4"
        },
        "line_output": true,
        "count": 0,
        "cycles": 0,
        "operation_division": 1.0,
        "min_stitch": 275,
        "max_stitch": 2000,
        "production_line": 2
    },
    {
        "id": 13,
        "active": false,
        "serial": "g2z57341",
        "device": {
            "id": 8,
            "serial": "70b8f623ca44",
            "name": "8"
        },
        "line_output": false,
        "count": 0,
        "cycles": 0,
        "operation_division": 1.0,
        "min_stitch": 10,
        "max_stitch": 70,
        "production_line": 3
    }
])

  useEffect(()=>{
    /*fetch('http://13.212.78.249/api/sewing/machine/list',{
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res)=>res.json())
      .then((response)=>setDevices(response))*/
  },[])

  useEffect(() => {


    if (!socket.current) {
      socket.current = new WebSocket('ws://test-kolonna-vpc-9cdaa5127d10c517.elb.ap-southeast-1.amazonaws.com:8081'); 

      setDevices(() => {
        const storedData = localStorage.getItem('devices');
        return storedData ? JSON.parse(storedData) : [];
      })
      

      socket.current.onopen = () => {
        console.log('WebSocket connected');
      };

      socket.current.onclose = () => {
        console.log('WebSocket disconnected');
      };
    }

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const ind = devices.findIndex((device)=>device.serial===data.serial)
      devices[ind].count = data.count
      console.log(data.count)
      setDevices((devices) => {
        const newObj = [...devices]
        const ind = newObj.findIndex((device)=>device.serial===data.serial)
        newObj[ind].count = data.count
       
        localStorage.setItem('devices', JSON.stringify(newObj));
        return newObj
      });
     // setDevices(devices)
     

    };


    return () => {

    };
  }, [devices]);

 

  return (
    <div className="grid grid-cols-4 gap-4">
   
    
        {devices && devices.map((device)=><div key={device.id}>
        <div
  className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
  <h5
    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
    {device.serial}
  </h5>
  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
    {device.count}
  </p>
  
</div>
        
        </div>)}
        
      
        </div>
  )
}
