import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Config/supabaseClient";
import { useAuth } from "../../Hooks/useAuth";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
import FPLogo from "../../Images/FamilyPlannerLight.png";

const TopNav = () => {
  const [theme, setTheme] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const handleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <>
      <div className="max-w-full h-16 flex flex-row justify-between items-center bg-slate-300 shadow-tn fixed top-0 right-0 left-0 z-20">
        <div
          className="w-20 h-10 rounded-md overflow-hidden flex ml-2 cursor-pointer"
          onClick={goToHome}
        >
          <img src={FPLogo} alt="Family Planner Logo" className="w-nc" />
        </div>
        <div>
          <h1 className="text-lg font-bold">{user.user_metadata.last_name}</h1>
        </div>
        <div>
          <Button size="small" onClick={toggleTheme}>
            {theme ? (
              <LightModeIcon size="small" />
            ) : (
              <DarkModeIcon size="small" />
            )}
          </Button>

          <Button onClick={handleDialog}>
            <SettingsIcon />
          </Button>
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={handleDialog}>
        <div className="w-80 h-80">
          <Button variant="contained" size="small" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default TopNav;
