//@ts-nocheck
import { useUserState } from "@/context/state"
import { useRef,useEffect } from "react";
import {
    IconAlertCircleFilled,
    IconCircleCheckFilled,
    IconCircleXFilled,
    IconInfoCircleFilled,
    IconX,
  } from "@tabler/icons-react";
  import { useToast } from "../hooks/useToast";
  const toastTypes = {
    success: {
      icon: <IconCircleCheckFilled />,
      iconClass: "success-icon",
      progressBarClass: "success",
    },
    warning: {
      icon: <IconAlertCircleFilled />,
      iconClass: "warning-icon",
      progressBarClass: "warning",
    },
    info: {
      icon: <IconInfoCircleFilled />,
      iconClass: "info-icon",
      progressBarClass: "info",
    },
    error: {
      icon: <IconCircleXFilled />,
      iconClass: "error-icon",
      progressBarClass: "error",
    },
  };
  //@ts-ignore
  const Toast = ({ message, type="error", id }) => {
   //@ts-ignore
   
   const { toastClass, icon, iconClass,progressBarClass } = toastTypes[type];
   const timerID = useRef(null); 
   const progressRef = useRef(null);
    const toast = useToast() // call useToast
    const handleDismiss = () => {
        toast.remove(id);
       };
       useEffect(() => {
        timerID.current = setTimeout(() => {
          handleDismiss();
        }, 4000);
    
        return () => {
          clearTimeout(timerID.current);
        };
      }, []);

      const handleMouseEnter = () => {
        clearTimeout(timerID.current);
        progressRef.current.style.animationPlayState = "paused";
      };
      const handleMouseLeave = () => {
        const remainingTime =
          (progressRef.current.offsetWidth /
            progressRef.current.parentElement.offsetWidth) *
          4000;
    
        progressRef.current.style.animationPlayState = "running";
    
        timerID.current = setTimeout(() => {
          handleDismiss();
        }, remainingTime);
      };

    return (
        <div className={`toast ${toastClass}`}
        onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
        >
      <span className={iconClass}>{icon}</span>
      <p className="toast-message">{message}</p>
      {/* Add onClick */}
      <button className="dismiss-btn" onClick={handleDismiss}>
        <IconX size={18} color="#aeb0d7" />
      </button>
      <div className="toast-progress">
      <div
      ref={progressRef}
      className={`toast-progress-bar ${progressBarClass}`}
    ></div>
      </div>
    </div>
    )
  }
  
  export default Toast;