import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';

const BottomNav = () => {
    const navigate = useNavigate()

    const goToHome = () => {
        navigate("/");
      };

    return (
        <div className="max-w-full h-10 flex flex-row justify-center items-center bg-slate-300 shadow-bn fixed bottom-0 right-0 left-0 z-20">
            <Button onClick={goToHome}>
                <HomeIcon />
            </Button>
        </div>
    )
}

export default BottomNav