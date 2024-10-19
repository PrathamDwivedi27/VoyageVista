import { useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState();

  const user = JSON.parse(localStorage.getItem("user"));

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false); // Close dialog after successful login
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.png" style={{ width: "60px", height: "auto" }} />
        <h1 style={{ fontSize: "2rem", fontWeight: "600", marginLeft: "1rem" }}>
          VoyageVista
        </h1>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-full bg-black text-white hover:bg-white hover:text-black border border-black transition-all font-semibold py-2 px-4"
              >
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button
                variant="outline"
                className="rounded-full bg-black text-white hover:bg-white hover:text-black border border-black transition-all font-semibold py-2 px-4"
              >
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture || "/placeholder.jpg"}
                  className="h-[35px] w-[35px] rounded-full ml-2"
                  alt={user.name}
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" style={{ width: "60px", height: "auto" }} />
              <h2 className="font-bold text-lg mt-7">Sign In with google</h2>
              <p>Sign in to the web with Google authentication</p>

              <Button
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-3 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
