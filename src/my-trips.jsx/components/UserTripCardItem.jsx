import { useState, useEffect } from "react";
import { GetPlaceDetails } from '../../service/GlobalApi';
import { PHOTO_REF_URL } from "../../service/GlobalApi";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[4].name);
      setPhotoUrl(PhotoUrl);
    });

    console.log(result);
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          alt="trip"
          className="object-cover rounded-xl h-[220px] w-full"
        />
        <div className="mt-2"> {/* Margin for spacing */}
          <h2 className="font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
