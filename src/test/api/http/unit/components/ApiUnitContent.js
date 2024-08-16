import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useLocation, useParams} from "react-router";
import ApiUnitEditPageCommon from "./apiUnitEditPageCommon";
import CaseBread from "../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiUnitExecuteTest from "./apiUnitExecuteTest";
import {Space} from "antd";
import ToggleCase from "../../../../testcase/components/ToggleCase";
import PageContent from "../../../../../common/pageContent/PageContent";


const ApiUnitContent = (props) =>{
    const {apiUnitStore} = props
    const {testCaseInfo} = apiUnitStore

    const history = useHistory()
    let {caseId} = useParams()
    const location = useLocation();
    const apiUnitId = sessionStorage.getItem('apiUnitId') || caseId;
    const repositoryId = sessionStorage.getItem("repositoryId")
    useEffect(async ()=>{
        //获取路由id存入
        sessionStorage.setItem('apiUnitId',caseId);

    },[apiUnitId,location.pathname])

    return(
        <PageContent>
            <div className={"content-box-center"}>
                <CaseBread
                    toggleCase={<ToggleCase  caseId={apiUnitId}/>}
                    breadItem={[testCaseInfo?.name]}
                    router={`/project/${repositoryId}/testcase`}
                    right={
                        <Space>
                            <ApiEnvDropDownSelect />
                            <IconBtn
                                className="pi-icon-btn-grey"
                                // icon={"lishi"}
                                onClick={()=> history.push(`/project/${repositoryId}/testcase/apiUnitInstance`)}
                                name={"历史"}
                            />
                            <ApiUnitExecuteTest apiUnitId={apiUnitId}/>
                        </Space>
                    }
                />
                <ApiUnitEditPageCommon apiUnitId={apiUnitId}/>
            </div>
        </PageContent>

    )
}

export default inject('apiUnitStore')(observer(ApiUnitContent));