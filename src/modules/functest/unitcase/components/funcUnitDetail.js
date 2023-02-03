/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import FuncUnitStepList from "./funcUnitStepList";
import DetailCommon from "../../../common/detailCommon";
import {Breadcrumb} from "antd";

const FuncUnitDetail = (props) => {
    const {funcUnitStore} = props;
    const {findFuncUnit,updateFuncUnit} = funcUnitStore;

    const [detailInfo,setDetailInfo]=useState();

    const funcUnitId = sessionStorage.getItem('funcUnitId');

    useEffect(()=> {
        findFuncUnit(funcUnitId).then(res=>{
            setDetailInfo(res);
        })
    },[funcUnitId])

    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateFuncUnit(param)
    }


    const goBack = () =>{
        props.history.push("/repository/testcase")
    }



    return(
        <div className={"content-box-center"}>
            <Breadcrumb className={"breadcrumb-box"}>
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>用例列表</Breadcrumb.Item>
                <Breadcrumb.Item>单元详情</Breadcrumb.Item>
            </Breadcrumb>

            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
            />
            <FuncUnitStepList />
        </div>
    )
}

export default inject('funcUnitStore')(observer(FuncUnitDetail));
