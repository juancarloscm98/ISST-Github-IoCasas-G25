import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/calendar.css'
import { useEffect } from 'react';
import { useState } from 'react';
function Bookings() {
  const [startDate,setStarDate]=useState(null);
  const[finishDate,setFinishDate]=useState(null)
  const [locks,setLocks]=useState([]);
useEffect(() => {
  getFechas();
  }, []);


  const getFechas=()=>{
    fetch("http://localhost:8080/api/locks/user/locksUser?token=" +
    sessionStorage.getItem("tokenUserRegistered"))
    .then((res)=>res.json())
    .then((data)=>{
      setLocks(data);
      console.log(data);
    })
  }
    const localizer = momentLocalizer(moment);
    
      const generateDates=()=>{
        const reservations=[];
        for(let i=0;i<locks.length;i++){
          const reserva=locks[i];
          reservations.push({
            title:'Reserva '+i,
            start:new Date(reserva.startDate),
            end:new Date(reserva.finishDate)
          })

        }
        return reservations;
      }
    return (
        <div>
          <Calendar
            localizer={localizer}
            events={generateDates()}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
          />
        </div>
      );
   
}

   
    
export default Bookings;