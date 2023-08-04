import React, {useEffect} from "react";
import { observer} from "mobx-react";
import WorkspaceFindList from "../workspaceBind/components/WorkspaceFindList";
import PostinUrlConfig from "../postinUrl/components/PostinUrlConfig";
import "./intergatedStyle.scss"
import workspaceBindStore from "../workspaceBind/store/WorkspaceBindStore";


const IntegratedPage = (props) =>{
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
                    <div className={'test-title'} style={{padding:0}}>
                        <div>地址配置</div>
                    </div>
                </div>
                <PostinUrlConfig />
                <div className='title-space-between'>
                    <div className={'test-title'} style={{padding:0}}>
                        <div>关联空间</div>
                    </div>
                </div>
                <div className={"integrated_workspace-bind"}>
                    <div><span>空间名 :</span> {workspaceName }</div> <WorkspaceFindList />
                </div>
            </div>
        </div>
    )
}

export default observer(IntegratedPage);