import { Button } from "@/components/ui/button"
import { useEffect,useState } from "react";
import { FaShareFromSquare } from "react-icons/fa6";
import { GetPlaceDetails } from '../../service/GlobalApi'
import { PHOTO_REF_URL } from "../../service/GlobalApi";

function InfoSection({trip}) {
  // console.log(trip);

  const[photoUrl,setPhotoUrl]=useState();

  useEffect(()=>{
    trip && GetPlacePhoto();
  },[trip]);

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label,
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
    <div>
      <img src={photoUrl?photoUrl:'placeholder.jpg'}className="h-[380px] w-full object-cover rounded" />
    <div className="flex justify-between items-center">
    <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>         {/* This is from console.log how the data is actually stored */}
        <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">📅 {trip?.userSelection?.noOfDays} Day</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">💰 {trip?.userSelection?.budget} Budget</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">🥂 No. of travellers:{trip?.userSelection?.traveller} </h2>
        </div>
    </div>

    <Button><FaShareFromSquare /></Button>
    </div>
    

    </div>
  )
}

export default InfoSection
