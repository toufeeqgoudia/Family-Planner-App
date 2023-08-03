import { useNavigate } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AirIcon from "@mui/icons-material/Air";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MessageIcon from "@mui/icons-material/Message";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import Carousel from "../Carousel";

const HomePage = () => {
    const navigate=useNavigate();

  return (
      <div className="max-w-screen flex flex-col justify-center items-center mt-20 mb-10 ">
        <Carousel />
        <div className="w-full flex flex-wrap justify-evenly p-3">
          
          <div onClick={() => navigate("/todo")} className="w-2/5 h-20 bg-gray-300 rounded-md p-2 m-2 relative cursor-pointer">
            <h3 className="text-base font-semibold">To-Dos</h3>
            <ListAltIcon
              sx={{
                color: "red",
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
            />
          </div>

          <div onClick={() => navigate("/calendar")} className="w-2/5 h-20 bg-gray-300 rounded-md p-2 m-2 relative cursor-pointer">
            <h3 className="text-base font-semibold">Calendar</h3>
            <CalendarMonthIcon
              sx={{
                color: "blueviolet",
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
            />
          </div>

          <div onClick={() => navigate("/budget")} className="w-2/5 h-20 bg-gray-300 rounded-md p-2 m-2 relative cursor-pointer">
            <h3 className="text-base font-semibold">Budget</h3>
            <LocalAtmIcon
              sx={{
                color: "green",
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
            />
          </div>

          <div onClick={() => navigate("/weather")} className="w-2/5 h-20 bg-gray-300 rounded-md p-2 m-2 relative cursor-pointer">
            <h3 className="text-base font-semibold">Weather</h3>
            <AirIcon
              sx={{
                color: "grey",
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
            />
          </div>

          <div onClick={() => navigate("/map")} className="w-2/5 h-20 bg-gray-300 rounded-md p-2 m-2 relative cursor-pointer">
            <h3 className="text-base font-semibold">Map</h3>
            <LocationOnIcon
              sx={{
                color: "yellow",
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
            />
          </div>

          <div onClick={() => navigate("/recipes")} className="w-2/5 h-20 bg-gray-300 rounded-md p-2 m-2 relative cursor-pointer">
            <h3 className="text-base font-semibold">Recipes</h3>
            <MenuBookIcon
              sx={{
                color: "orange",
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
            />
          </div>

          <div onClick={() => navigate("/messages")} className="w-2/5 h-20 bg-gray-300 rounded-md p-2 m-2 relative cursor-pointer">
            <h3 className="text-base font-semibold">Messages</h3>
            <MessageIcon
              sx={{
                color: "teal",
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
            />
          </div>

          <div onClick={() => navigate("/myfamily")} className="w-2/5 h-20 bg-gray-300 rounded-md p-2 m-2 relative cursor-pointer">
            <h3 className="text-base font-semibold">My Family</h3>
            <FamilyRestroomIcon
              sx={{
                color: "blue",
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
            />
          </div>

        </div>
      </div>
  );
};

export default HomePage;