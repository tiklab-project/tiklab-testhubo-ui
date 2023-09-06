import React,{useEffect,useState} from 'react';
import { inject,observer } from 'mobx-react';
import {useHistory, useParams} from "react-router";
import {Breadcrumb, Input} from "antd";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import IconCommon from "../../../../../common/IconCommon";
import ApiPerformDetail from "./apiPerformDetail";

const ApiPerfContent = (props) => {
    const {apiPerfStore} = props;
    const {findApiPerf,updateApiPerf} = apiPerfStore;

    const [caseInfo,setCaseInfo]=useState();
    const [caseName, setCaseName] = useState();

    let {id} = useParams()
    const apiPerfId = sessionStorage.getItem('apiPerfId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiPerfId',id);

        findApiPerf(apiPerfId).then(res=>{
            setCaseInfo(res);
            setCaseName(res?.testCase?.name)
        })
    },[apiPerfId])


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
        updateApiPerf(param).then(()=>{
            findApiPerf(apiPerfId).then(res=>{
                setCaseInfo(res);
            })
        })
    }


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
            <ApiPerformDetail/>
        </>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfContent));
