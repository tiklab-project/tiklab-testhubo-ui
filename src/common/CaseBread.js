import React from "react";
import IconCommon from "./IconCommon";
import {showCaseTypeInList} from "./caseCommon/CaseCommonFn";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
import {Breadcrumb} from "antd";

const CaseBread = (props) =>{
    const {title,icon,style,caseType,setOpen,breadItem,right} = props

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
            return <ArrowLeftOutlined
                onClick={()=>history.goBack()}
                style={{
                    cursor:"pointer",
                    fontSize:"20px"
                }}

            />
        }

    }

    const showBreadItem = (breadItem) =>{
        return breadItem.map((item,index)=>{
            return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
        })
    }

    return(
        <div className={"breadcrumb-title_between"} style={style}>
            <div className={"breadcrumb-left"}>
                {
                    showIcon(icon)
                }
                {
                    breadItem
                        ?<Breadcrumb style={{fontWeight:"bold"}}>{showBreadItem(breadItem)}</Breadcrumb>
                        :<div className={"case-header_title"}>{title}</div>
                }
                {
                    caseType&&showCaseTypeInList(caseType)
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