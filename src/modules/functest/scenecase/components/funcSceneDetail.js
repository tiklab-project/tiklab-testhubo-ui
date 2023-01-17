/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import FuncSceneStepList from "./funcSceneStepList";
import DetailCommon from "../../../common/detailCommon";

const FuncSceneDetail = (props) => {
    const {funcSceneStore} = props;
    const {findFuncScene,updateFuncScene} = funcSceneStore;

    const [detailInfo,setDetailInfo]=useState();
    const funcSceneId = sessionStorage.getItem('funcSceneId');

    useEffect(()=> {
        findFuncScene(funcSceneId).then(res=>{
            setDetailInfo(res);
        })
    },[funcSceneId])

    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateFuncScene(param)
    }

    return(
        <div className={"content-box-center"}>
            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
            />

            <FuncSceneStepList />
        </div>
    )
}

export default inject('funcSceneStore')(observer(FuncSceneDetail));
