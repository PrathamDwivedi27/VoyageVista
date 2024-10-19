
import { Link } from 'react-router-dom'
import { useEffect,useState } from "react";
import { PHOTO_REF_URL, GetPlaceDetails } from '../../service/GlobalApi';

const HotelCardItem = ({hotel}) => {

    const[photoUrl,setPhotoUrl]=useState();

  useEffect(()=>{
    hotel && GetPlacePhoto();
  },[hotel]);

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:hotel?.name,
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
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+','+hotel?.address}> 
            <div  className="hover:scale-105 transition-all cursor pointer">
                <img src={photoUrl?photoUrl:'placeholder.jpg'} className="rounded-xl h-[200px] w-full object-cover" alt="" />
                <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-medium">{hotel?.name}</h2>
                    <h2 className="font-medium text-xs text-gray-400">📌 {hotel?.address}</h2>
                    <h2 className="text-sm">💰 {hotel?.price}</h2>
                    <h2 className="text-sm">⭐ {hotel?.rating}</h2>



                </div>
            </div>
            </Link>
  )
}

export default HotelCardItem
