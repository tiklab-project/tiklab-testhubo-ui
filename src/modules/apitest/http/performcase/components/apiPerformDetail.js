import React, {useEffect, useState} from "react";
import {Button,Tabs} from "antd";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../../common/backCommon";
import ApiPerformSceneConfig from "./apiPerformSceneConfig";
import ApiPerformCofig from "./apiPerformCofig";
import ApiEnvSelect from "../../apitest/apiEnvSelect";
import {updateApiPerform} from "../api/apiPerformApi";

const { TabPane } = Tabs;

const ApiPerformDetail = (props) =>{
    const {apiPerformStore} = props;
    const {findApiPerform} = apiPerformStore;



    const [baseInfo,setBaseInfo]=useState();
    const [editTitle,setEditTitle] = useState()
    const [createUser, setCreateUser] = useState();
    const [updataUser, setUpdataUser] = useState();
    const [category, setCategory] = useState();
    const [updateTime, setUpdateTime] = useState();

    const apiPerfId = sessionStorage.getItem("apiPerfId");


    useEffect(()=>{
        findApiPerform(apiPerfId).then(res=>{

            setBaseInfo(res);
            setEditTitle(res.testCase?.name)
            setCreateUser(res.createUser?.name);
            setUpdataUser(res.updateUser?.name);
            setCategory(res.category?.name);
            setUpdateTime(res.testCase.updateTime);
        })
    },[apiPerfId])

    const updateTitle = (value) =>{


    }


    const changeTab = (actvieKey) =>{

    }



    return(
        <>
            <div>
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
                </Tabs>
            </div>
        </>
    )
}

export default inject("apiPerformStore")(observer(ApiPerformDetail));