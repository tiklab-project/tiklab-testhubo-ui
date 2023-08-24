import React, {useEffect, useState} from "react";
import {Breadcrumb, Tabs} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../../../common/DetailCommon";
import ApiPerformTest from "./apiPerformTestDrawer";
import ApiPerformDetailCommon from "./apiPerformDetailCommon";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import {useParams} from "react-router";


const ApiPerformDetail = (props) =>{
    const {apiPerfStore} = props;
    const {findApiPerf,updateApiPerf} = apiPerfStore;

    const [detailInfo,setDetailInfo]=useState();

    let {id} = useParams()
    const apiPerfId = sessionStorage.getItem("apiPerfId") || id;


    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiPerfId',id);

        findApiPerf(apiPerfId).then(res=>{
            setDetailInfo(res);
        })
    },[apiPerfId])

    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateApiPerf(param).then(()=>{
            findApiPerf(apiPerfId).then(res=>{
                setDetailInfo(res);
            })
        })
    }


    //去往历史页
    const toHistory = () =>{
        props.history.push("/repository/testcase/api-perform-instance")
    }

    //返回列表
    const goBack = () =>{
        props.history.push("/repository/testcase")
    }

    return(
        <div className={"content-box-center"}>
            <Breadcrumb className={"breadcrumb-box"}>
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>测试用例</Breadcrumb.Item>
                <Breadcrumb.Item>{detailInfo?.testCase.name}</Breadcrumb.Item>
            </Breadcrumb>

            <DetailCommon
                type={true}
                detailInfo={detailInfo}
                updateTitle={updateTitle}

                test={
                    <>
                        <IconBtn
                            className="pi-icon-btn-grey"
                            icon={"lishi"}
                            onClick={toHistory}
                            name={"历史"}
                        />
                        <ApiEnvDropDownSelect />
                        <ApiPerformTest />
                    </>
                }
            />

            <ApiPerformDetailCommon type={true} {...props} />
        </div>
    )
}

export default inject("apiPerfStore")(observer(ApiPerformDetail));