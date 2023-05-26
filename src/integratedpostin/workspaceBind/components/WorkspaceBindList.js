import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WorkspaceFindList from "./WorkspaceFindList";
import PostinUrlConfig from "../../postinUrl/components/PostinUrlConfig";
import "./intergatedStyle.scss"


const WorkspaceBindList = (props) =>{
    const {workspaceBindStore} = props;
    const {findWorkspaceBindList,workspaceName} = workspaceBindStore


    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findWorkspaceBindList({repositoryId:repositoryId})
    },[])


    return(
        <div className={"content-box-center"}>
            <div  className={"header-box-space-between"} >
                <div className={'header-box-title'}>系统集成</div>

            </div>
            <div className={"integrated_content-box"}>
                <div className='title-space-between'>
                    <div className={'test-title'}>
                        <div>关联空间</div>
                    </div>
                </div>
                <div className={"integrated_workspace-bind"}>
                    <div><span>空间名 :</span> {workspaceName }</div> <WorkspaceFindList />
                </div>

                <div className='title-space-between'>
                    <div className={'test-title'}>
                        <div>地址配置</div>
                    </div>
                </div>
                <PostinUrlConfig />
            </div>


        </div>
    )
}

export default inject("workspaceBindStore")(observer(WorkspaceBindList));