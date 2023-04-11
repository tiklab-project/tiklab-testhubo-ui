/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import FuncUnitStepList from "./funcUnitStepList";
import DetailCommon from "../../../common/DetailCommon";
import {Breadcrumb} from "antd";

const FuncUnitDetail = (props) => {
    const {funcUnitStore} = props;
    const {findFuncUnit,updateFuncUnit} = funcUnitStore;

    const [detailInfo,setDetailInfo]=useState();

    const functionId = sessionStorage.getItem('functionId');

    useEffect(()=> {
        findFuncUnit(functionId).then(res=>{
            setDetailInfo(res);
        })
    },[functionId])

    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateFuncUnit(param).then(()=>{
            findFuncUnit(functionId).then(res=>{
                setDetailInfo(res);
            })
        })
    }


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
                detailInfo={detailInfo}
                updateTitle={updateTitle}
            />
            <FuncUnitStepList />
        </div>
    )
}

export default inject('funcUnitStore')(observer(FuncUnitDetail));
