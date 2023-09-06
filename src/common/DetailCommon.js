import React from "react";
import EdiText from "react-editext";
import {Space} from "antd";
import IconBtn from "./iconBtn/IconBtn";

/**
 * 用于详情
 */
const DetailCommon = (props) =>{
    const {detailInfo } = props;

    return(
        <div className={"detail-box"}>
            <div className={"detail-header"}>
                <div style={{"display":"flex","gap":"10px","alignItems":"center"}}>
                    <div className={'edit-api-name'  }>{detailInfo?.testCase?.name}</div>
                </div>

            </div>
            <div className={"detail-bottom"}>
                <span className={"detail-bottom-item "}>分组:{detailInfo?.testCase?.category?.name||"未设置"} </span>
                {/*<span className={"detail-bottom-item "}>创建人:{detailInfo?.testCase?.createUser?.name} </span>*/}
                <span className={"detail-bottom-item "}>更新者:{detailInfo?.testCase?.updateUser?.nickname||"未更新"}</span>
                {/*<span className={"detail-bottom-item "}>创建时间:{detailInfo?.testCase?.createTime}</span>*/}
                <span className={"detail-bottom-item "}>更新时间:{detailInfo?.testCase?.updateTime}</span>
            </div>
        </div>
    )
}

export default DetailCommon;