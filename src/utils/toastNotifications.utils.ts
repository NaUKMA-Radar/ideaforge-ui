import { CheckCirlceIcon } from 'components/Icons/Icons';
import { toast, Slide } from 'react-toastify';

// Reusable toast notification functions
const toastNotifications = {
    info: (message: string) => {
        toast.info(message, {
            transition: Slide,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    },

    success: (message: string) => {
        toast.success(message, {
            transition: Slide,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                backgroundColor: '#006352',
                color: 'white',
                border: '2px solid white',
            },
            icon: CheckCirlceIcon,
        });
    },
};

export default toastNotifications;
