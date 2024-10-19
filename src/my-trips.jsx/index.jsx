import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Corrected import from useNavigation to useNavigate
import { db } from "../service/firebaseConfig";
import UserTripCardItem from "../my-trips.jsx/components/UserTripCardItem"; // Adjust the import path as necessary

const MyTrips = () => {
  const navigate = useNavigate(); // Changed to useNavigate
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "Trips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    
    // Create a new array for trips instead of appending to existing state
    const trips = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      trips.push(doc.data()); // Push each trip into the array
    });
    
    setUserTrips(trips); // Set the trips array, overwriting any previous state
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 max-w-4xl mx-auto">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10 object-cover rounded-xl">
        {userTrips.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripCardItem key={index} trip={trip} />
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyTrips;
