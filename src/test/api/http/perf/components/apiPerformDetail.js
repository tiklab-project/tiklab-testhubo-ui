import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Form} from "antd";
import DetailCommon from "../../../../../common/DetailCommon";
import CaseContentCommon from "../../../../common/CaseContentCommon";
import ApiPerfStepList from "./apiPerfStepList";
import ApiPerfTestDataPage from "./ApiPerfTestDataPage";
import ApiPerformConfig from "./apiPerfConfig";


const ApiPerformDetail = (props) =>{
    const {apiPerfStore,apiEnvStore} = props;
    const {findApiPerf,updateApiPerf} = apiPerfStore;
    const { envUrl } =apiEnvStore;

    const [form] = Form.useForm()
    const [caseInfo,setCaseInfo]=useState();
    const apiPerfId = sessionStorage.getItem("apiPerfId");
    useEffect(()=>{
        findApiPerf(apiPerfId).then(res=>{
            setCaseInfo(res);

            let testCase = res.testCase
            form.setFieldsValue({
                name: testCase.name,
                category:testCase.category?.id,
                updateTime:testCase.updateTime,
                createTime:testCase.createTime,
                status:testCase.status,
                priorityLevel:testCase.priorityLevel,
                director:testCase.director?.id,
            })
        })

    },[apiPerfId])




    const updateCase = async () =>{
        let newData = await form.getFieldsValue()
        const params = {
            id:caseInfo.id,
            testCase: {
                ...caseInfo.testCase,
                name:newData.name,
                category:{id:newData.category||"nullstring"},
                status:newData.status,
                priorityLevel:newData.priorityLevel,
                director: {id:newData.director},
            }
        }
        updateApiPerf(params).then(()=>{
            findApiPerf(apiPerfId).then(res=>{
                setCaseInfo(res);
            })
        })
    }


    const tabItem = [
        {
            label:"详细信息",
            key:"1",
            children:<DetailCommon
                type={true}
                detailInfo={caseInfo}
                updateCase={updateCase}
                form={form}
            />
        },{
            label:"场景配置",
            key:"2",
            children:<ApiPerfStepList type={true} {...props} />
        },{
            label:"压力配置",
            key:"3",
            children: <ApiPerformConfig {...props}/>
        },{
            label:"测试数据",
            key:"4",
            children: <ApiPerfTestDataPage />
        }
    ]

    return(

        <CaseContentCommon tabItem={tabItem}/>

    )
}

export default inject("apiPerfStore","apiEnvStore")(observer(ApiPerformDetail));