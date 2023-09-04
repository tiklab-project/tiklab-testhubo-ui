import React, {useEffect, useState} from "react";
import {Drawer} from "antd";
import {useHistory, useLocation} from "react-router";
import {renderRoutes} from "react-router-config";
import {CASE_TYPE} from "./DefineVariables";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";


const TestCaseDrawer = (props) =>{
    const {caseData,testcaseStore} = props
    const {testCaseRecent}=testcaseStore;

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const repositoryId = sessionStorage.getItem("repositoryId")
    let pathname = useLocation().pathname;

    useEffect(()=>{
        if(open&&pathname==="/repository/testcase"){
            setOpen(false)
        }
        // else {
        //     let locationArr = pathname.split("/")
        //     if(locationArr.length>3){
        //         setOpen(true)
        //     }
        // }
    },[pathname,open])

    const showDrawer = () => {
        switchCaseType(caseData)
        setOpen(true);
    };

    const onClose = () => {
        history.push("/repository/testcase")
        setOpen(false);
    };

    //再根据不同的用例类型跳到不同的页面
    const switchCaseType = (record)=>{
        setRecent(record)
        switch (record.caseType) {
            case CASE_TYPE.API_UNIT:
                toCaseDetail("apiUnitId",record)
                break;
            case CASE_TYPE.API_SCENE:
                toCaseDetail("apiSceneId",record)
                break;
            case CASE_TYPE.API_PERFORM:
                toCaseDetail("apiPerfId",record)
                break;
            case CASE_TYPE.WEB_SCENE:
                toCaseDetail("webSceneId",record)
                break;
            case CASE_TYPE.WEB_PERFORM:
                toCaseDetail("webPerfId",record)
                break;
            case CASE_TYPE.APP_SCENE:
                toCaseDetail("appSceneId",record)
                break;
            case CASE_TYPE.APP_PERFORM:
                toCaseDetail("appPerfId",record)
                break;
            case CASE_TYPE.FUNCTION:
                toCaseDetail("functionId",record)
                break;

        }
    }

    //跳转路由
    const toCaseDetail = (setId,record)=>{
        sessionStorage.setItem(`${setId}`,record.id);
        history.push(`/repository/testcase/${record.caseType}/${record.id}`)
    }

    //设置最近打开的接口
    const setRecent =(record)=>{
        let params = {
            repository:{id:repositoryId},
            user:{id:getUser().userId},
            testCase:{id:record.id},
        }
        testCaseRecent(params)
    }


    return(
        <>
            <a onClick={showDrawer}>
                {caseData.name}
            </a>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={"70%"}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                closable={false}
            >
                {
                    renderRoutes(props?.route?.routes)
                }
            </Drawer>
        </>
    )
}


export default inject("testcaseStore")(observer(TestCaseDrawer));