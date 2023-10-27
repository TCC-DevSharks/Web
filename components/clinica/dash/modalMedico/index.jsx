import React from "react";
import { AiFillCloseCircle, AiOutlineArrowRight } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import styles from "./style.module.css"

export default function ModalMedicoDash({closeModal}) {
    const handleChange = (event) => {
        setValor(event.target.value);
      };
    return (
        <>
            <div className={styles['modalContainer']}>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="black" />

                <div className={styles['modalBox']}>
                    <div className={styles['modalContent']}>
                        <div className={styles['closeButtonModal']} onClick={closeModal}>
                            <AiFillCloseCircle style={{ fill: '#fa0000' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}