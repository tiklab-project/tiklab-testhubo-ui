import React,{useEffect,useState} from 'react';
import { inject,observer } from 'mobx-react';
import ApiSceneStepList from "./apiSceneStepList";
import BackCommon from "../../../../common/backCommon";
import ApiEnvSelect from "../../../../sysmgr/environment/components/apiEnvSelect";
import ApiSceneTestResult from "./apiSceneTestResult";
import DetailCommon from "../../../../common/detailCommon";

const ApiSceneDetail = (props) => {
    const {apiSceneStore} = props;
    const {findApiScene,updateApiScene} = apiSceneStore;

    const [detailInfo,setDetailInfo]=useState();
    const apiSceneId = sessionStorage.getItem('apiSceneId');
    useEffect(()=>{
        findApiScene(apiSceneId).then(res=>{
            setDetailInfo(res);
        })
    },[apiSceneId])

    //
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            getSelectItem(selectedRows)
        },
    };

    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateApiScene(param)
    }

    const toHistory = () =>{
        props.history.push("/repositorypage/apitest/scenecase-instance")
    }


    const goBack = () =>{
        props.history.push("/repositorypage/apitest")
    }

    return(
        <>
            <BackCommon clickBack={goBack} right={<ApiEnvSelect history={props.history}/>} />
            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
                toHistory={toHistory}
                test={<ApiSceneTestResult/>}
            />
            <div className={'test-title'}>
                <div>测试步骤</div>
            </div>
            <ApiSceneStepList {...props}/>
        </>
    )


}

export default inject('apiSceneStore')(observer(ApiSceneDetail));
