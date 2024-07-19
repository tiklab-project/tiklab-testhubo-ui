import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router";
import {Space} from "antd";
import CaseBread from "../../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../../support/environment/components/apiEnvDropDownSelect";
import IconBtn from "../../../../../../common/iconBtn/IconBtn";
import ApiUnitExecuteTest from "../apiUnitExecuteTest";
import ApiUnitEditPageCommon from "../apiUnitEditPageCommon";


const ApiUnitContentListView = (props) =>{
    const {apiUnitStore} = props
    const {testCaseInfo} = apiUnitStore
    const history = useHistory()
    let {id} = useParams()
    const apiUnitId = sessionStorage.getItem('apiUnitId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiUnitId',id);

    },[apiUnitId])


    return(
        <div className={"content-box-center"}>
            <CaseBread
                icon={"api1"}
                breadItem={[testCaseInfo?.name]}
                right={
                    <Space>
                        <ApiEnvDropDownSelect />
                        <IconBtn
                            className="pi-icon-btn-grey"
                            icon={"lishi"}
                            onClick={()=> history.push("/repository/testcase-list/api-unit-instance")}
                            name={"历史"}
                        />
                        <ApiUnitExecuteTest apiUnitId={apiUnitId}/>
                    </Space>
                }
            />
            <ApiUnitEditPageCommon apiUnitId={apiUnitId}/>
        </div>
    )
}

export default inject('apiUnitStore')(observer(ApiUnitContentListView));