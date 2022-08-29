import React, {Fragment, useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import Request from './request';
import RequestType from "../../../../common/requestType";
import Response from "./response";
import './unitcase.scss'
import BackCommon from "../../../../common/backCommon";
import ApiEnvSelect from "../../../../sysmgr/environment/components/apiEnvSelect";
import TestResultDrawer from "./apiUnitTestResult";

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
        addRouter({pathname:'/repositorypage/apitest/unitcase'})
    }

    //返回
    const  goBack = () => {

        if(caseType==="unit"){
            addRouter("/repositorypage/apitest/unitcase")
        }else if(caseType==="scene"){
            addRouter("/repositorypage/apitest/scenedetail")
        }

    }



    const toHistory = () =>{
        addRouter("/repositorypage/apitest/unitcase-instance")
    }

    return(
        <Fragment>
            <BackCommon clickBack={goBack} right={<ApiEnvSelect history={props.history}/>} />
            <div className="apidetail-header-btn">
                <div className={"method-name"}>{name}</div>
                <div className={'apidetail-title-tool'}>
                    {
                        caseType === "unit"
                            ?<Button onClick={toHistory}>历史</Button>
                            :null
                    }

                    <TestResultDrawer />
                    <Button danger onClick={()=>handleDeleteApiUnit(apiUnitId)}>删除</Button>
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
            {/*<div className="title ex-title">输入参数</div>*/}
            <Request  />
            <div className="title ex-title">输出结果</div>
            <Response />

        </Fragment>
    )
}

export default inject('apiUnitStore')(observer(ApiUnitDetail));
