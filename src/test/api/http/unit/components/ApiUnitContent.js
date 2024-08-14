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
    let {id} = useParams()
    const location = useLocation();

    useEffect(async ()=>{
        //获取路由id存入
        sessionStorage.setItem('apiUnitId',id);

    },[id,location.pathname])

    return(
        <PageContent>
            <div className={"content-box-center"}>
                <CaseBread
                    toggleCase={<ToggleCase  caseId={id}/>}
                    breadItem={[testCaseInfo?.name]}
                    router={`/project/${sessionStorage.getItem("repositoryId")}/testcase`}
                    right={
                        <Space>
                            <ApiEnvDropDownSelect />
                            <IconBtn
                                className="pi-icon-btn-grey"
                                // icon={"lishi"}
                                onClick={()=> history.push("/project/apiUnitInstance")}
                                name={"历史"}
                            />
                            <ApiUnitExecuteTest apiUnitId={id}/>
                        </Space>
                    }
                />
                <ApiUnitEditPageCommon apiUnitId={id}/>
            </div>
        </PageContent>

    )
}

export default inject('apiUnitStore')(observer(ApiUnitContent));