import React from "react";
import pi1 from "../assets/img/pi1.png"
import pi2 from "../assets/img/pi2.png"
import pi3 from "../assets/img/pi3.png"
import pi4 from "../assets/img/pi4.png"
import pi5 from "../assets/img/pi5.png"

export const RepositoryIcon = (props) => {
    const {iconUrl,className,...rest} = props

    const iconMap = {
        "pi1.png": pi1,
        "pi2.png": pi2,
        "pi3.png": pi3,
        "pi4.png": pi4,
        "pi5.png": pi5
    };

    const showIcon = ()=>{
        for (const key in iconMap) {
            if (iconUrl?.includes(key)) {
                return <img src={iconMap[key]} alt={"icon"} className={className} {...rest}/>;
            }
        }
    }

    return(
        <>
            {showIcon()}
        </>
    )
};

export default RepositoryIcon;