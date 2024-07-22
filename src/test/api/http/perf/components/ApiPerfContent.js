import React, {useEffect, useState} from 'react';
import {inject,observer } from 'mobx-react';
import {useParams} from "react-router";
import ApiPerformDetail from "./apiPerformDetail";
import CaseBread from "../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import ApiPerfExecuteTestPage from "./ApiPerfExecuteTestPage";
import {Select, Space} from "antd";
import ToggleCase from "../../../../testcase/components/ToggleCase";
import agentConfigStore from "../../../../../support/agent/store/AgentConfigStore";

const {Option} = Select;

const ApiPerfContent = (props) => {
    const {apiPerfStore} = props;
    const {testCaseInfo} = apiPerfStore
    const {findAgentConfigList,agentConfigList} = agentConfigStore

    let {id} = useParams()
    const apiPerfId = sessionStorage.getItem('apiPerfId') || id;
    const [agentId, setAgentId] = useState();

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiPerfId',id);
    },[apiPerfId])


    useEffect(()=>{
        findAgentConfigList({
            status:"online",
            enable: 1
        })

        let agentId = sessionStorage.getItem("agentSelect")
        if( agentId){
            setAgentId(agentId)
        }else {
            //设置默认agent
            sessionStorage.setItem("agentSelect","agent-default_localhost")
        }
    },[])

    const changeAgent=(agentId)=>{
        sessionStorage.setItem("agentSelect",agentId)
        setAgentId(agentId)
    }

    return(
        <div className={"content-box-center"}>
            <CaseBread
                router={`/repository/testcase/${sessionStorage.getItem("repositoryId")}`}
                style={{borderBottom:"none"}}
                breadItem={[testCaseInfo?.name]}
                toggleCase={<ToggleCase  caseId={apiPerfId}/>}
                right={
                    <Space>
                        <ApiEnvDropDownSelect />
                        <Select
                            className={"api-env-select-box"}
                            onSelect={changeAgent}
                            value={agentId||"agent-default_localhost"}
                            bordered={false}
                        >
                            {
                                agentConfigList.map(item=>{
                                    return<Option key={item.id} value={item.id}>{
                                        item.id==="agent-default_localhost"
                                            ?"默认Agent"
                                            :item.name
                                    }</Option>
                                })
                            }
                        </Select>
                        <ApiPerfExecuteTestPage apiPerfId={apiPerfId}/>
                    </Space>
                }
            />
            <ApiPerformDetail apiPerfId={apiPerfId}/>
        </div>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfContent));
