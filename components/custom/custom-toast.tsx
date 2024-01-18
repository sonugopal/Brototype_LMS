import { toast } from 'react-hot-toast';
import { useTheme } from 'next-themes'; // replace with your actual theme provider

interface ToastMessageProp {
    message: string
}

export function CustomToast() {
    const { theme } = useTheme();

    function showToast({ message }: ToastMessageProp) {
        toast.error(message, {
            position: 'top-right',
            className: 'dark:bg-[#141E36]  rounded-lg',
            style: {
                color: theme === 'dark' ? '#fff' : '#000'
            }
        });
    }

    return showToast;
}