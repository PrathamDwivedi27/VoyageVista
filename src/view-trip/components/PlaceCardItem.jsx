import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { PHOTO_REF_URL, GetPlaceDetails } from '../../service/GlobalApi';

const PlaceCardItem = ({place}) => {
  const[photoUrl,setPhotoUrl]=useState();

  useEffect(()=>{
    place && GetPlacePhoto();
  },[place]);

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:place.name,
    }

    const result=await GetPlaceDetails(data).then(resp=>{
      // console.log(resp.data);

      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[4].name);
      // console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl);
    })

    console.log(result);
  }  


  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.name}>
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img
        src={photoUrl?photoUrl:'/placeholder.jpg'}
        className="w-[130px] h-[130px] rounded-xl"
      />
      <div>
        <h2 className="font-bold text-lg">{place.name}</h2>
        <p className="text-sm text-gray-400">{place.details}</p>
        <h2 className="mt-2">💸 {place.ticketPricing}</h2>
      </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem
