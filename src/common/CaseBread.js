import React from "react";
import IconCommon from "./IconCommon";
import {DrawerCloseIcon} from "../test/common/BreadcrumbCommon";
import {showCaseTypeInList} from "./caseCommon/CaseCommonFn";

 const CaseBread = (props) =>{
    const {title,icon,style,caseType} = props

    return(
        <div className={"breadcrumb-title_between"} style={style}>
            <div className={"breadcrumb-left"}>
                <IconCommon
                    icon={icon}
                    className="icon-s "
                    style={{margin: "3px 5px 0"}}
                />
                <div className={"case-header_title"}>{title}</div>
                {
                    caseType&&showCaseTypeInList(caseType)
                }
            </div>
            <DrawerCloseIcon />
        </div>
    )
}

export default CaseBread