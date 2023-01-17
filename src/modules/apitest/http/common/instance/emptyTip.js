import React from "react";
import noneImg from "../../../../../assets/img/nonedoc.png"

//空白处理
const EmptyTip = (props) =>{
    const {content} = props;

    return(
        <div style={{
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
            "height":"calc( 100% - 48px)",
            overflow: "hidden",
            "flex":1
        }}>
            <div>
                <img src={noneImg} alt={"none-img"} width={200} />
                <div style={{textAlign:"center"}}>{content?content:"点击列表查看"}</div>
            </div>
        </div>
    )
}

export default EmptyTip