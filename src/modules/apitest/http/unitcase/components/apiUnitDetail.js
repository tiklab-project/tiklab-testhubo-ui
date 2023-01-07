import React, {Fragment, useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import {Button, Space} from 'antd';
import Request from './request';
import RequestType from "../../../../common/requestType";
import Response from "./response";
import './unitcase.scss'
import BackCommon from "../../../../common/backCommon";
import ApiEnvSelect from "../../../../sysmgr/environment/components/apiEnvSelect";
import TestResultDrawer from "./apiUnitTestResult";
import ApiUnitEdit from "./apiUnitEdit";

const ApiUnitDetail = (props) => {
    const { apiUnitStore } = props;
    const { findApiUnit,deleteApiUnit } = apiUnitStore;

    const addRouter = props.history.push;

    let caseType = localStorage.getItem("caseType")
    const apiUnitId = sessionStorage.getItem('apiUnitId');

    const [name,setName]=useState();
    const [methodType, setMethodType] = useState();
    const [path, setPath] = useState();
    const [desc, setDesc] = useState();
    const [createUser, setCreateUser] = useState();
    const [updateUser, setUpdateUser] = useState();
    const [category, setCategory] = useState();
    const [updateTime, setUpdateTime] = useState();

    useEffect(()=>{
        findApiUnit(apiUnitId).then((res)=>{
            setName(res.testCase.name);
            setMethodType(res.methodType);
            setPath(res.path);
            setDesc(res.testCase.desc);
            setCreateUser(res.testCase.createUser?.name);
            setUpdateUser(res.testCase.updateUser?.name);
            setCategory(res.testCase.category?.name);
            setUpdateTime(res.testCase.updateTime);
        })
    },[apiUnitId])

    // 删除步骤
    const handleDeleteApiUnit = (apiUnitId) => {
        deleteApiUnit(apiUnitId)
        addRouter({pathname:'/repositorypage/testcase/list'})
    }

    //返回
    const  goBack = () => {
        addRouter("/repositorypage/testcase/list")
    }



    const toHistory = () =>{
        addRouter("/repositorypage/testcase/api-unitcase-instance")
    }

    return(
        <>
            <BackCommon
                // clickBack={goBack}
                right={<ApiEnvSelect history={props.history}/>}
            />
            <div className={"detail-info-box"}>
                <div className="apidetail-header-btn">
                    <div className={"method-name"}>{name}</div>
                    <div className={'apidetail-title-tool'}>
                        <Space>
                            {
                                caseType === "unit"
                                    ?<Button onClick={toHistory}>历史</Button>
                                    :null
                            }
                            <ApiUnitEdit
                                name={"编辑"}
                                caseType={"unit"}
                                isCategory={true}
                                btn={"btn"}
                                type={"edit"}
                                apiUnitId={apiUnitId}
                            />
                            <TestResultDrawer />
                            <Button danger onClick={()=>handleDeleteApiUnit(apiUnitId)}>删除</Button>
                        </Space>

                    </div>
                </div>
                <div className={"method"}>
                    <div className={"method-info info-item"}>
                        <span className={"method-info-item "}><RequestType type={methodType} /></span>
                        <span className={"method-info-item method-info-path"}>{path}</span>
                    </div>
                    <div className={"info-item"}><span>描述:</span>{desc}</div>
                    <div className={"method-people-info"}>
                        <span className={"people-item "}>分组: {category}</span>
                        <span className={"people-item "}>创建人: {createUser}</span>
                        <span className={"people-item "}>更新者: {updateUser}</span>
                        <span className={"people-item "}>更新时间: {updateTime}</span>
                    </div>
                </div>
                <div className="header-title ex-title">输入参数</div>
                <Request  />
                <div className="header-title ex-title">输出结果</div>
                <Response />
            </div>
        </>
    )
}

export default inject('apiUnitStore')(observer(ApiUnitDetail));
