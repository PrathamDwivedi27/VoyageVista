import { Link } from "react-router-dom"
import HotelCardItem from "./HotelCardItem"


function Hotels({trip}) {
  // console.log(trip);
  return (
    <div>
      <h2 className="font-bold tex-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.tripData?.trip?.hotels?.map((hotel,index)=>(
          <HotelCardItem hotel={hotel} key={index}/>
             
        ))}

      </div>
    </div>
  )
}

export default Hotels
