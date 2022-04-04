import React, {Fragment, useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import Request from './request';
import RequestType from "../../../common/requestType";
import Response from "./response";
import './unitcase.scss'
import BackCommon from "../../../common/backCommon";

const ApiUnitcaseDetail = (props) => {
    const { stepStore } = props;
    const { findStep,deleteStep } = stepStore;

    const addRouter = props.history.push;

    let caseType = localStorage.getItem("caseType")
    const stepId = localStorage.getItem('stepId');

    const [showResponse,setShowResponse] = useState(false);

    const [name,setName]=useState("casename");
    const [requestType,setRequestType] =useState("post");
    const [path, setPath] = useState("/a/b/c/d");
    const [desc, setDesc] = useState("13rwretwetwetw");
    const [createUser, setCreateUser] = useState("user");
    const [updataUser, setUpdataUser] = useState("user");
    const [category, setCategory] = useState("目录");
    const [updateTime, setUpdateTime] = useState("2022-22-22-");

    useEffect(()=>{
        findStep(stepId).then((res)=>{
            setName(res.name);
            setRequestType(res.stepType);
            setPath(res.path);
            setDesc(res.desc);
            setCreateUser(res.createUser?.name);
            setUpdataUser(res.updateUser?.name);
            setCategory(res.category?.name);
            setUpdateTime(res.updateTime);
        })
    },[stepId])

    //执行测试
    const actionTest = () =>{
        //调接口

        setShowResponse(true)
    }

    // 删除步骤
    const handleDeleteStep = (stepId) => {
        deleteStep(stepId)
        addRouter({pathname:'/repositorypage/apitest/unitcase'})
    }

    //返回
    const  goBack = () => {

        if(caseType==="unitcase"){
            addRouter("/repositorypage/apitest/unitcase")
        }else if(caseType==="scenecase"){
            addRouter("/repositorypage/apitest/scenedetail")
        }

    }



    const toHistory = () =>{
        addRouter("/repositorypage/apitest/unitcase-instance")
    }

    return(
        <Fragment>
            <BackCommon clickBack={goBack} />
            <div className="apidetail-header-btn">
                <div className={"method-name"}>{name}</div>
                <div className={'apidetail-title-tool'}>
                    {
                        caseType === "unitcase"
                            ?<Button onClick={toHistory}>历史</Button>
                            :null
                    }

                    <Button className="important-btn" onClick={actionTest}>测试</Button>
                    <Button danger onClick={()=>handleDeleteStep(stepId)}>删除</Button>
                </div>
            </div>
            <div className={"method"}>
                <div className={"method-info info-item"}>
                    <span className={"method-info-item "}><RequestType type={requestType} /></span>
                    <span className={"method-info-item method-info-path"}>{path}</span>
                </div>
                <div className={"info-item"}><span>描述:</span>{desc}</div>
                <div className={"method-people-info"}>
                    <span className={"people-item "}>分组: {category}</span>
                    <span className={"people-item "}>创建人: {createUser}</span>
                    <span className={"people-item "}>更新者: {updataUser}</span>
                    <span className={"people-item "}>更新时间: {updateTime}</span>
                </div>
            </div>
            <div className="title ex-title">输入参数</div>
            <Request  />
            <div className="title ex-title">输出结果</div>
            <Response showResponse={showResponse} />

        </Fragment>
    )
}

export default inject('stepStore')(observer(ApiUnitcaseDetail));
