import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function Bookings() {
    
    const[logged,setLogged]=useState(false);
    useEffect(()=>{
        console.log(sessionStorage.getItem("boolUserRegistered"));
        if(sessionStorage.getItem("boolUserRegistered")==="true"){

            setLogged(true);
        }
    },[])
    return(
        
       <div >
        {
            logged?(
                <iframe width={"70%"} height={"700px"} src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Africa%2FCeuta&src=NjhlNDA4MmNjZGY4MGQxMDNlM2E0NDE1MzBjNzAwYmQzOTdhZDdmMzRlZjNkNDU3YmU3MWY3MmFhOWVlNTYyZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZXMuc3BhaW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23D81B60&color=%237986CB"></iframe>
               
            ):(null)
        }
       
       </div>
            
           
           
    
    );
}
export default Bookings;