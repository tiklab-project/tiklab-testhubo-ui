import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ApiPerformDetailCommon from "./apiPerformDetailCommon";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import {useHistory} from "react-router";
import {Button, Form, Space} from "antd";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";
import DetailCommon from "../../../../../common/DetailCommon";


const ApiPerformDetail = (props) =>{
    const {apiPerfStore,apiEnvStore} = props;
    const {findApiPerf,updateApiPerf} = apiPerfStore;
    const { envUrl } =apiEnvStore;

    const [form] = Form.useForm()
    const [caseInfo,setCaseInfo]=useState();
    const history = useHistory();
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

    const toExePage = () =>{
        if(envUrl){
            history.push("/repository/testcase/api-perform-execute")
        }else {
            messageFn("error","请选择环境")
        }
    }


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


    return(
        <div className={"content-box-center"}>
            <div className='title-space-between'>
                <div className={"case-title_weight"}>
                    <div>基本信息</div>
                </div>
                {
                    props.planType
                        ? null
                        :<Space>
                            <ApiEnvDropDownSelect />
                            <IconBtn
                                className="pi-icon-btn-grey"
                                icon={"lishi"}
                                onClick={()=>history.push("/repository/testcase/api-perform-instance")}
                                name={"历史"}
                            />
                            <Button className={"important-btn"} onClick={toExePage}>
                                测试
                            </Button>
                        </Space>
                }

            </div>
            <DetailCommon
                type={true}
                detailInfo={caseInfo}
                updateCase={updateCase}
                form={form}
            />

            <ApiPerformDetailCommon type={true} {...props} />
        </div>
    )
}

export default inject("apiPerfStore","apiEnvStore")(observer(ApiPerformDetail));