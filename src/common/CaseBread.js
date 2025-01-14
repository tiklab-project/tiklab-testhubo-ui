import React from "react";
import IconCommon from "./IconCommon";
import {showCaseTypeInList} from "./caseCommon/CaseCommonFn";
import {ArrowLeftOutlined, LeftOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
import {Breadcrumb} from "antd";
import ToggleCase from "../test/testcase/components/ToggleCase";

const CaseBread = (props) =>{
    const {icon,style,toggleCase,setOpen,breadItem,right,router} = props

    const history =useHistory()

    const showIcon = () =>{
        if(icon){
            return(
                <IconCommon
                    icon={icon}
                    className="icon-m"
                    style={{margin: "3px 5px 0"}}
                />
            )
        }else{
            return <LeftOutlined style={{fontSize:"16px"}} onClick={()=>history.push(router)}/>
        }

    }

    const showBreadItem = (breadItem) =>{
        return breadItem.map((item,index)=>{
            return <Breadcrumb.Item key={index} style={{fontSize:"16px"}}>{item}</Breadcrumb.Item>
        })
    }

    return(
        <div className={"breadcrumb-title_between"} style={style}>
            <div className={"breadcrumb-left"}>
                {
                    showIcon(icon)
                }
                <Breadcrumb style={{fontWeight:"bold"}}>{showBreadItem(breadItem)}</Breadcrumb>
                {
                    toggleCase&&toggleCase
                }
            </div>
            {
                right
                    ?<>{right}</>
                    :null
            }
            {
                setOpen
                    ?<IconCommon
                        className={"icon-s edit-icon"}
                        icon={"shanchu2"}
                        onClick={()=>setOpen(false)}
                    />
                    :null
            }
        </div>
    )
}

export default CaseBread