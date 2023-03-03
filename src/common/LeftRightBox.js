import React from "react";


const LeftRightBox = (props) =>{
    const {left, right } = props;


    return(
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            margin: "10px 10px 20px"
        }}>
            <div>
                {left}
            </div>
            <div>
                {right}
            </div>
        </div>
    )
}
export default LeftRightBox;