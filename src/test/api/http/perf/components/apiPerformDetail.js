import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Form} from "antd";
import DetailCommon from "../../../../../common/caseCommon/DetailCommon";
import CaseContentCommon from "../../../../common/CaseContentCommon";
import ApiPerfStepList from "./apiPerfStepList";
import "../../../../common/styles/caseContantStyle.scss"
import "../../../../common/styles/unitcase.scss"
import ApiPerfInstanceList from "./apiPerfInstanceList";

const ApiPerformDetail = (props) =>{
    const {apiPerfStore,apiEnvStore,apiPerfId} = props;
    const {findApiPerf,updateApiPerf} = apiPerfStore;
    const { envUrl } =apiEnvStore;

    const [form] = Form.useForm()
    const [caseInfo,setCaseInfo]=useState();
    const [actionTap, setActionTap] = useState();

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
                desc: testCase.desc,
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
                desc:newData.desc
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
                detailInfo={caseInfo}
                updateCase={updateCase}
                form={form}
            />
        },{
            label:"场景配置",
            key:"2",
            children:<ApiPerfStepList type={!!props.planType} {...props} apiPerfId={apiPerfId}/>
        },{
            label: `历史`,
            key: 'history',
            children: <ApiPerfInstanceList actionTap={actionTap}/>
        }
    ]

    return(
        <CaseContentCommon tabItem={tabItem} changeTap={(actionKey)=>setActionTap(actionKey)}/>
    )
}

export default inject("apiPerfStore","apiEnvStore")(observer(ApiPerformDetail));