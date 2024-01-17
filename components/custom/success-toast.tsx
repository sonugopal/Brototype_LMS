import { toast } from 'react-hot-toast';
import { useTheme } from 'next-themes'; // replace with your actual theme provider

interface ToastMessageProp {
    message: string
}

export function useSuccessToast() {
    const { theme } = useTheme();

    function showSuccessToast({ message }: ToastMessageProp) {
        toast.success(message, {
            position: 'top-right',
            className: 'dark:bg-[#141E36]  rounded-lg',
            style: {
                color: theme === 'dark' ? '#fff' : '#000'
            }
        });
    }

    return showSuccessToast;
}