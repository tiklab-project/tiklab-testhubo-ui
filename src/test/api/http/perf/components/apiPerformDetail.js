import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../../../common/DetailCommon";
import ApiPerformTest from "./apiPerformTestDrawer";
import ApiPerformDetailCommon from "./apiPerformDetailCommon";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import {useHistory, useParams} from "react-router";
import {Breadcrumb} from "antd";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";


const ApiPerformDetail = (props) =>{
    const {apiPerfStore} = props;
    const {findApiPerf,updateApiPerf} = apiPerfStore;

    const [detailInfo,setDetailInfo]=useState();
    const history = useHistory();
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
        history.push("/repository/testcase/api-perform-instance")
    }

    return(
        <div className={"content-box-center"}>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item>用例详情</Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>
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