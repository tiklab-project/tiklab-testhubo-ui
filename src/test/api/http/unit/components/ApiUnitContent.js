import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router";
import ApiUnitEditPageCommon from "./apiUnitEditPageCommon";
import CaseBread from "../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiUnitExecuteTest from "./apiUnitExecuteTest";
import {Space} from "antd";


const ApiUnitContent = (props) =>{
    const {apiUnitStore} = props;
    const {testCaseInfo} = apiUnitStore;

    const history = useHistory()
    let {id} = useParams()
    const apiUnitId = sessionStorage.getItem('apiUnitId') || id;

    useEffect(async ()=>{
        //获取路由id存入
        sessionStorage.setItem('apiUnitId',id);

    },[apiUnitId])

    return(
        <div className={"content-box-center"}>
            <CaseBread
                caseType={testCaseInfo?.caseType}
                breadItem={["用例详情"]}
                right={
                    <Space>
                        <ApiEnvDropDownSelect />
                        <IconBtn
                            className="pi-icon-btn-grey"
                            icon={"lishi"}
                            onClick={()=> history.push("/repository/api-unit-instance")}
                            name={"历史"}
                        />
                        <ApiUnitExecuteTest apiUnitId={apiUnitId}/>
                    </Space>
                }
            />
            <ApiUnitEditPageCommon/>
        </div>
    )
}

export default inject('apiUnitStore')(observer(ApiUnitContent));