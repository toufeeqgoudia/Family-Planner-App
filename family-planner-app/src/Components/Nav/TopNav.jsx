import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Config/supabaseClient";
import { useAuth } from "../../Hooks/useAuth";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from '@mui/icons-material/Close';
import FPLogo from "../../Images/FamilyPlannerLight.png";

const TopNav = () => {
  const [theme, setTheme] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detDialogOpen, setDetDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
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

  const handeDetDialog = () => {
    setDialogOpen(false)
    setDetDialogOpen(!detDialogOpen);
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData, 
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleNewEmail = async () => {
    try {
      const { error } = await supabase.auth.updateUser({ email: formData.email })
      if (error) throw error
    } catch (error) {
      console.log('Error updating email', error.message);
    }
  }

  const handleNewPassword = async () => {
    try {
      const { error } = await supabase.auth.updateUser({ password: formData.password })
      if (error) throw error
    } catch (error) {
      console.log('Error updating password', error.message);
    }
  }

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
        <div className="w-80 h-44 flex flex-col">
          <h3 className="text-lg font-bold m-2">Settings:</h3>
          <Divider variant="middle" />
          <div className="max-w-full pt-2 pb-2 flex justify-center">
            <Button variant="contained" size="small" onClick={handeDetDialog} sx={{ width: '80%', height: '40px', }}>
              Update Details
            </Button>
          </div>
          <Divider variant="middle"  />
          <div className="max-w-full pt-2 pb-2 flex justify-evenly">
            <Button variant="contained" onClick={handleDialog} sx={{ width: '35%', height: '40px', }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSignOut} sx={{ width: '35%', height: '40px', }}>
              Sign Out
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog open={detDialogOpen} onClose={handeDetDialog}>
        <div className="w-80 h-72 p-2 flex flex-col">
          <div className="flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold m-2">Update Details:</h3>
        <CloseIcon sx={{ margin: '8px', cursor: 'pointer' }} onClick={handeDetDialog} />
        </div>
        <Divider variant="middle"  />
          <form className="w-full flex justify-between my-2" onSubmit={handleNewEmail}>
            <TextField name="email" label='New Email' sx={{ width: '75%' }} onChange={handleChange} />
            <Button variant="text" type="submit" sx={{ width: '15%' }}>Update</Button>
          </form>
          <Divider variant="middle"  />
          <form className="w-full flex justify-between my-2" onSubmit={handleNewPassword}>
            <TextField name="password" label='New Password' sx={{ width: '75%' }} onChange={handleChange} />
            <Button variant="text" type="submit" sx={{ width: '15%' }}>Update</Button>
          </form>
          <Divider variant="middle"  />
          <Button variant="contained" sx={{ width: '50%', alignSelf: 'center', margin: '8px' }} onClick={handeDetDialog}>Cancel</Button>
        </div>
      </Dialog>
    </>
  );
};

export default TopNav;
