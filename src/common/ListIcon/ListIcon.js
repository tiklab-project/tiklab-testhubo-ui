import React from "react";
import "./ListIcon.scss";



const getRandomColorClass = () => {
    const randomIndex = Math.floor(Math.random() * 6); // 生成 0 到 5 的随机数
    return `mf-icon-${randomIndex}`;
};

/**
 * 表格标题首字母
 */
const ListIcon = ({text,colors,isMar=true,className}) => {
    const colorClass = colors ? `mf-icon-${colors}` : getRandomColorClass();

    return (
        <div
            className={`${className} mf-listname-icon ${colorClass} ${isMar && 'mf-listname-icon-mar'}`}
        >
            {text ? text.substring(0, 1).toUpperCase() : 'M'}
        </div>
    )
}

export default ListIcon
