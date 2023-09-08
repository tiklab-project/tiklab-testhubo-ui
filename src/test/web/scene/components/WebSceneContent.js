import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Breadcrumb} from "antd";
import IconCommon from "../../../../common/IconCommon";
import {useParams} from "react-router";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";
import WebSceneDetail from "./webSceneDetail";

const WebSceneContent = (props) =>{
    const {webSceneStore} = props;
    const {caseName} = webSceneStore;

    let {id} = useParams()
    const webSceneId = sessionStorage.getItem('webSceneId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('webSceneId',id);
    },[webSceneId])

    return(
       <>
           <div className={"breadcrumb-title_between"} style={{border:"none"}}>
               <Breadcrumb className={"breadcrumb-box"}>
                   <IconCommon
                       icon={"jiekou1"}
                       className="icon-s "
                       style={{margin: "3px 5px 0"}}
                   />
                   <Breadcrumb.Item>
                       <Breadcrumb.Item>
                           <div className={"case-header_title"}>{caseName}</div>
                       </Breadcrumb.Item>
                   </Breadcrumb.Item>
               </Breadcrumb>
               <DrawerCloseIcon />
           </div>
           <WebSceneDetail/>
       </>
    )
}

export default inject('webSceneStore')(observer(WebSceneContent));