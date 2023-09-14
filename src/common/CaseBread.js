import React from "react";
import IconCommon from "./IconCommon";
import {DrawerCloseIcon} from "../test/common/BreadcrumbCommon";
import {showCaseTypeInList} from "./caseCommon/CaseCommonFn";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";

 const CaseBread = (props) =>{
    const {title,icon,style,caseType,hideClose} = props

    const history =useHistory()


     const showIcon = () =>{
        if(icon){
            return(
                <IconCommon
                    icon={icon}
                    className="icon-s "
                    style={{margin: "3px 5px 0"}}
                />
            )
        }else {
            return <ArrowLeftOutlined onClick={()=>history.goBack()} style={{cursor:"pointer"}}/>
        }
     }

    return(
        <div className={"breadcrumb-title_between"} style={style}>
            <div className={"breadcrumb-left"}>
                {
                    showIcon(icon)
                }
                <div className={"case-header_title"}>{title}</div>
                {
                    caseType&&showCaseTypeInList(caseType)
                }
            </div>
            {
                hideClose
                    ?null
                    :<DrawerCloseIcon/>
            }
        </div>
    )
}

export default CaseBread