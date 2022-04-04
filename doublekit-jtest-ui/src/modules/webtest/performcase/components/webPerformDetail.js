import React, {useEffect, useState} from "react";
import {Button, Tabs} from "antd";
import BackCommon from "../../../common/backCommon";
import {inject, observer} from "mobx-react";
import WebPerformSceneConfig from "./webPerformSceneConfig";
import WebPerformCofig from "./webPerformCofig";
const { TabPane } = Tabs;

const WebPerformDetail = (props) =>{
    const {webPerformStore} = props;
    const {findWebPerform} = webPerformStore;

    const [showResponse, setShowResponse] = useState(false);

    const [baseInfo,setBaseInfo]=useState();
    const [editTitle,setEditTitle] = useState("PerformeName")
    const [createUser, setCreateUser] = useState("user");
    const [updataUser, setUpdataUser] = useState("user");
    const [category, setCategory] = useState("目录");
    const [updateTime, setUpdateTime] = useState("2022-22-22-");


    useEffect(()=>{
        findWebPerform(11).then(res=>{

            setBaseInfo(res);
            setEditTitle(res.name)
            setCreateUser(res.createUser?.name);
            setUpdataUser(res.updateUser?.name);
            setCategory(res.category?.name);
            setUpdateTime(res.updateTime);
        })
    },[])
    
    const updateTitle = (value) =>{

    }

    const toHistory = () =>{
        props.history.push("/repositorypage/webtest/perform-instance")
    }


    const onTest = ()=>{
        setShowResponse(true)
    }

    const changeTab = (actvieKey) =>{

    }

    const goback = () =>{
        props.history.push("/repositorypage/webtest/performcase")
    }


    return(
        <>
            <BackCommon clickBack={goback}  />
            <div className={'testcase-webUI-form'}>
                <div className="web-form-header">
                    <div
                        className='teststep-title'
                        contentEditable={true}
                        suppressContentEditableWarning  //去掉contentEditable 提示的页面警告
                        onBlur={updateTitle}
                    >
                        {editTitle}
                    </div>
                    <div>
                        <a onClick={toHistory}>测试历史</a>
                        <Button onClick={onTest}>执行测试</Button>
                    </div>

                </div>
                <div className={"method-people-info"}>
                    <span className={"people-item "}>分组: {category}</span>
                    <span className={"people-item "}>创建人: {createUser}</span>
                    <span className={"people-item "}>更新者: {updataUser}</span>
                    <span className={"people-item "}>更新时间: {updateTime}</span>
                </div>
            </div>
            <Tabs defaultActiveKey="1" onChange={changeTab}>
                <TabPane tab="场景配置" key="1">
                    <WebPerformSceneConfig />
                </TabPane>
                <TabPane tab="压力配置" key="2">
                    <WebPerformCofig />
                </TabPane>
            </Tabs>
        </>
    )
}
export default inject("webPerformStore")(observer(WebPerformDetail));