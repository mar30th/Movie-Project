import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const ToastMessage: React.FC = () => {
    const cloneToast = {
        error: (message: string) => toast(message, {type: "error"}),
        success: (message: string) => toast(message, {type: "success"}),
        info: (message: string) => toast(message, {type: "info"}),
    };
    Object.assign(message, cloneToast)
  return (
    <div>
        <ToastContainer position='top-right' />
    </div>
  )
}

export const message: any = {};