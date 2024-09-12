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
    const {findApiPerf,updateApiPerf,apiPerfInfo} = apiPerfStore;
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
            children:<div className={"case-detail-center"}>
                <DetailCommon
                    detailInfo={caseInfo}
                    updateCase={updateCase}
                    form={form}
                />
            </div>
        },{
            label:  <span>测试步骤 <span className={"font-12"}>{apiPerfInfo?.stepNum||0}</span></span>,
            key:"2",
            children:<ApiPerfStepList type={!!props.planType} {...props} apiPerfId={apiPerfId}/>
        },{
            label:  <span>历史 <span className={"font-12"}>{apiPerfInfo?.instanceNum||0}</span></span>,
            key: 'history',
            children: <ApiPerfInstanceList actionTap={actionTap}/>
        }
    ]

    return(
        <CaseContentCommon tabItem={tabItem} changeTap={(actionKey)=>setActionTap(actionKey)}/>
    )
}

export default inject("apiPerfStore","apiEnvStore")(observer(ApiPerformDetail));