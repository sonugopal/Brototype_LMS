import { toast } from 'react-hot-toast';

interface ToastMessageProp {
    message: string
}

export function WaitToast() {

    function showWaitingToast({ message }: ToastMessageProp) {
        const toastId = toast.loading(message, {
            position: 'top-right',
            className: 'rounded-lg bg-black border',
            style: {
                color: 'white',
                background: 'black'
            }
        });

        setTimeout(() => {
            toast.dismiss(toastId);
        }, 8000);   
    }

    return showWaitingToast;
}
