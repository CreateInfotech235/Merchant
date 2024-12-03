import React, { useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
function Gotop() {
    const [show, setshow] = useState((window.scrollY + window.innerHeight - 10 > window.innerHeight));
    window.addEventListener("scroll", () => {
        if (window.scrollY + window.innerHeight - 10 > window.innerHeight) {
            setshow(true);
        } else {
            setshow(false);
        }
    });
    return (
        <>
            <div onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" })
            }} style={{
                zIndex: "9999",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                color: "white",
                backgroundColor: "#111827",
                display: "flex",
                opacity: show ? "1" : "0",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                bottom: "50px",
                right: "50px",
                border:"1px solid #ffffff40",
                cursor:'pointer',
                transition: "0.5s",
                '&:hover': {
                    backgroundColor: "#b25f0c"
                }
            }} className='shadow-xl' >
                <FaArrowUp />
            </div>
        </>
    )
}

export default Gotop;