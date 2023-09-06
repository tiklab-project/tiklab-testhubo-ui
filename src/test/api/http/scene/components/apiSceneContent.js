import React,{useEffect,useState} from 'react';
import { inject,observer } from 'mobx-react';
import {useHistory, useParams} from "react-router";
import {Breadcrumb, Input} from "antd";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import CaseContentCommon from "../../../../common/CaseContentCommon";
import IconCommon from "../../../../../common/IconCommon";
import ApiSceneDetail from "./ApiSceneDetail";
import ApiSceneInstanceList from "./apiSceneInstanceList";

const ApiSceneContent = (props) => {
    const {apiSceneStore} = props;
    const {findApiScene,updateApiScene} = apiSceneStore;

    const [caseInfo,setCaseInfo]=useState();
    const [caseName, setCaseName] = useState();

    let {id} = useParams()
    const apiSceneId = sessionStorage.getItem('apiSceneId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiSceneId',id);

        findApiScene(apiSceneId).then(res=>{
            setCaseInfo(res);
            setCaseName(res?.testCase?.name)
        })
    },[apiSceneId])


    //更新名称
    const updateName = (e) =>{
        let name = e.target.value
        setCaseName(name)
        const param = {
            id:caseInfo.id,
            testCase: {
                ...caseInfo.testCase,
                name:name,
            }
        }
        updateApiScene(param).then(()=>{
            findApiScene(apiSceneId).then(res=>{
                setCaseInfo(res);
            })
        })
    }


    const tabItem=[
        {
            label: `基本信息`,
            key: '1',
            children: <ApiSceneDetail/>
        }, {
            label: `测试历史`,
            key: '2',
            children:<ApiSceneInstanceList />
        },
    ]

    return(
        <>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <IconCommon
                        icon={"jiekou1"}
                        className="icon-s "
                        style={{margin: "3px 5px 0"}}
                    />
                    <Breadcrumb.Item>
                        <Input
                            value={caseName}
                            className={"case-header_title"}
                            onChange={updateName}
                        />
                    </Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>
            <ApiSceneDetail/>
        </>
    )


}

export default inject('apiSceneStore')(observer(ApiSceneContent));
