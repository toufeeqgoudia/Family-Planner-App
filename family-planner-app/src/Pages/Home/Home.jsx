import { Routes, Route } from "react-router-dom";
import TopNav from "../../Components/Nav/TopNav";
import BottomNav from "../../Components/Nav/BottomNav";
import HomePage from "../../Components/HomePage.jsx/HomePage";
import Todo from "../../Components/Todo/Todo";
import Calendar from "../../Components/Calendar/Calendar";
import Budget from "../../Components/Budget/Budget";
import Weather from "../../Components/Weather/Weather";
import Map from "../../Components/Map/Map";
import Recipe from "../../Components/Recipe/Recipe";
import Messages from "../../Components/Messages/Messages";
import MyFamily from "../../Components/MyFamily/MyFamily";

const Home = () => {

  return (
    <>
      <TopNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/map" element={<Map />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/myfamily" element={<MyFamily />} />
        </Routes>
      <BottomNav />
    </>
  );
};

export default Home;
