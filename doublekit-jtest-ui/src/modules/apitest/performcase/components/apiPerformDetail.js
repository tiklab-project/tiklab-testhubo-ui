import React, {useEffect, useState} from "react";
import {Button,Tabs} from "antd";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import ApiPerformSceneConfig from "./apiPerformSceneConfig";
import ApiPerformCofig from "./apiPerformCofig";
import ApiEnvSelect from "../../apitest/apiEnvSelect";

const { TabPane } = Tabs;

const ApiPerformDetail = (props) =>{
    const {apiPerformStore} = props;
    const {findApiPerform} = apiPerformStore;

    const [showResponse, setShowResponse] = useState(false);

    const [baseInfo,setBaseInfo]=useState();
    const [editTitle,setEditTitle] = useState("PerformeName")
    const [createUser, setCreateUser] = useState("user");
    const [updataUser, setUpdataUser] = useState("user");
    const [category, setCategory] = useState("目录");
    const [updateTime, setUpdateTime] = useState("2022-22-22-");


    useEffect(()=>{
        findApiPerform(11).then(res=>{

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
        props.history.push("/repositorypage/apitest/perform-instance")
    }


    const onTest = ()=>{
        setShowResponse(true)
    }

    const changeTab = (actvieKey) =>{

    }

    const goBack = () =>{
        props.history.push("/repositorypage/apitest/performcase")
    }

    return(
        <>
            <div>
                <BackCommon clickBack={goBack} right={<ApiEnvSelect history={props.history}/>} />
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
                        <ApiPerformSceneConfig />
                    </TabPane>
                    <TabPane tab="压力配置" key="2">
                        <ApiPerformCofig />
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default inject("apiPerformStore")(observer(ApiPerformDetail));