import React, {useEffect, useState} from 'react';
import {inject,observer } from 'mobx-react';
import {useParams} from "react-router";
import {Select, Space} from "antd";
import CaseBread from "../../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../../support/environment/components/apiEnvDropDownSelect";
import ApiPerfExecuteTestPage from "../ApiPerfExecuteTestPage";
import ApiPerformDetail from "../apiPerformDetail";
import agentConfigStore from "../../../../../../support/agent/store/AgentConfigStore";

const {Option} = Select;

const ApiPerfContentListView = (props) => {
    const {apiPerfStore} = props;
    const {testCaseInfo} = apiPerfStore
    const {findAgentConfigList,agentConfigList} = agentConfigStore

    const apiPerfId = sessionStorage.getItem('apiPerfId');
    const [agentId, setAgentId] = useState();

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
                icon={"api1"}
                breadItem={[testCaseInfo?.name]}
                right={
                    <Space>
                        <ApiEnvDropDownSelect />
                        <Select
                            className={"select-box"}
                            onSelect={changeAgent}
                            value={agentId}
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

export default inject('apiPerfStore')(observer(ApiPerfContentListView));
