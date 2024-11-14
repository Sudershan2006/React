import React, { useState, useEffect } from 'react';
import "./Home.css";
import '../output.css';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TextField, Button, Typography, Container, Grid, Card } from '@mui/material';

export function Home(props) {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState("Madurai");
  const [to, setTo] = useState("Coimbatore");
  const [date, setDate] = useState('2024-09-20');
  const [fBus,setFbus] = useState('');

  useEffect(() => {
    if (props.login) {
      const fetchData = async () => {
        try {
          const resp = await fetch('http://localhost:3001/bus');
          if (!resp.ok) throw new Error('Network response was not ok');
          const jsonData = await resp.json();
          setData(jsonData);
          // console.log(data[0]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData(); // Fetch data immediately on mount
      // const intervalId = setInterval(fetchData, 1000); // Fetch data every second

      // return () => clearInterval(intervalId); // Cleanup on unmount or dependency change
    }
  }, [props.login]);

  const search = () => {
    // console.log(data)
    // data.map((value,index)=>{
    //   value.map((val,ind)=>{
    //     console.log(val.from)
    //   })
    // })
    if (data.length > 0 && data!=undefined){
      // data.map((val,index)=>{
      //   console.log(val.date+" "+date);
      // })

      // console.log(data)
      setFbus(data.filter(bus => 
        (bus.from.toLowerCase() == from.toLowerCase() &&
        bus.to.toLowerCase() == to.toLowerCase() &&
        bus.date == date) ||
        (bus.via.find(route=>route.toLowerCase() == from.toLowerCase() && bus.to.toLowerCase() == to.toLowerCase()))
      ));
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Container maxWidth="lg" className="mt-10 flex flex-col justify-center items-center gap-10">
          <Typography variant="h4" className="text-center mb-6">
            Welcome to GoBusGo!
          </Typography>
          <div className="flex justify-center items-center" style={{ gap: 25 }}>
            <TextField 
              label="From" 
              variant="outlined" 
              className="mr-2"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <TextField 
              label="To" 
              variant="outlined" 
              className="mr-2" 
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <TextField 
              type="date" 
              variant="outlined" 
              className="mr-2" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={search}>
              Search Buses
            </Button>
          </div>
            {fBus.length > 0 &&
              <Typography variant="h5" className="text-center mb-4">
                Search Results
              </Typography>
            }
          
          <Grid container spacing={4}>
            {fBus.length > 0 && (
              fBus.map((bus, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card className="p-5 flex flex-col justify-start items-start">
                    <Typography variant="h6">{bus.name}</Typography>
                    <Typography>Departure: {bus.from}</Typography>
                    <Typography>Arrival: {bus.to}</Typography>
                    <Typography>Time: {bus.time}</Typography>
                    <Button variant="outlined" color="primary" className="mt-2">
                      Book Now
                    </Button>
                  </Card>
                </Grid>
              )))}
          </Grid>
          </Container>
      </Container>

      {/* About Us Section */}
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 xl:overflow-visible xl:px-0 w-full">
        <div className="mx-auto grid max-w-full grid-cols-1 gap-x-8 gap-y-16 xl:grid-cols-2 xl:items-start xl:gap-y-10">
          <div className="xl:col-span-2 xl:mx-auto xl:grid xl:w-full xl:grid-cols-2 xl:gap-x-8 xl:px-8">
            <div className="10xl:pr-4">
              <div className="xl:max-w-xl">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  We are dedicated to making your travel experience seamless and enjoyable. Our platform allows you to effortlessly search for bus routes, view available options, and book your tickets—all in one place.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="xl:col-span-2 xl:mx-auto xl:grid xl:w-full xl:grid-cols-2 xl:gap-x-8 xl:px-8">
            <div className="xl:pr-4">
              <div className="max-w-full text-base leading-7 text-gray-700">
                <p>
                  At GoBusGo, our mission is to simplify the way you travel. We strive to provide a user-friendly interface that helps you find the best bus options tailored to your needs. Whether you’re planning a weekend getaway or a long-distance trip, we’ve got you covered.
                </p>
                <p className="mt-8">
                  Join us at GoBusGo and embark on your next adventure with ease! Thank you for choosing us as your travel companion. Safe travels!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}