import React,{useEffect} from 'react';
import { inject,observer } from 'mobx-react';
import {useHistory, useParams} from "react-router";
import ApiSceneDetail from "./ApiSceneDetail";
import CaseBread from "../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiExecuteTestPage from "./ApiExecuteTestPage";
import {Space} from "antd";


const ApiSceneContent = (props) => {
    const {apiSceneStore} = props;
    const {testCaseInfo} = apiSceneStore

    let history = useHistory()
    let {id} = useParams()
    const apiSceneId = sessionStorage.getItem('apiSceneId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiSceneId',id);

    },[apiSceneId])

    return(
        <div className={"content-box-center"}>
            <CaseBread
                style={{borderBottom:"none"}}
                // title={testCaseInfo?.name}
                caseType={testCaseInfo?.caseType}
                breadItem={["用例详情"]}
                right={
                    <Space>
                        <ApiEnvDropDownSelect />
                        <IconBtn
                            className="pi-icon-btn-grey"
                            icon={"lishi"}
                            onClick={()=>history.push("/repository/api-scene-instance")}
                            name={"历史"}
                        />
                        <ApiExecuteTestPage apiSceneId={apiSceneId}/>
                    </Space>
                }
            />
            <ApiSceneDetail/>
        </div>
    )


}

export default inject('apiSceneStore')(observer(ApiSceneContent));
