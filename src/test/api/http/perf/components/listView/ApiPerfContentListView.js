import React, {useEffect, useState} from 'react';
import {inject,observer } from 'mobx-react';
import {Select} from "antd";
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
                    <div className={"display-flex-between header-right-box"}>
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
                                        item.id==="agent-default_ocalhost"
                                            ?"默认Agent"
                                            :item.name
                                    }</Option>
                                })
                            }
                        </Select>
                        <ApiPerfExecuteTestPage apiPerfId={apiPerfId}/>
                    </div>
                }
            />
            <ApiPerformDetail apiPerfId={apiPerfId}/>
        </div>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfContentListView));
