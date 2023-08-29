import React from "react";
import IconCommon from "../../common/IconCommon";
import {useHistory} from "react-router";

export const DrawerCloseIcon = () =>{

    let history = useHistory()
    let curPage = localStorage.getItem("TOGGLE_TABLE_RO_LIST_PAGE")

    //在table视图展示关闭按钮
    const showCloseIcon = (curPage) =>{
        if(curPage==="table"){
            return(
                <IconCommon
                    className={"icon-s edit-icon"}
                    icon={"shanchu2"}
                    onClick={()=>history.push("/repository/testcase")}
                />
            )
        }
    }

    return(
        <>
            {showCloseIcon(curPage)}
        </>
    )
}
