import React,{useEffect,useState} from 'react';
import { inject,observer } from 'mobx-react';
import ApiSceneStepList from "./apiSceneStepList";
import ApiSceneTestResult from "./apiSceneTestResult";
import DetailCommon from "../../../../../common/detailCommon";
import {Breadcrumb} from "antd";
import ApiEnvSelect from "../../../../../support/environment/components/apiEnvSelect";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";

const ApiScenePage = (props) => {
    const {apiSceneStore} = props;
    const {findApiScene,updateApiScene} = apiSceneStore;

    const [detailInfo,setDetailInfo]=useState();
    const apiSceneId = sessionStorage.getItem('apiSceneId');
    useEffect(()=>{
        findApiScene(apiSceneId).then(res=>{
            setDetailInfo(res);
        })
    },[apiSceneId])


    //更新名称
    const updateTitle = (e) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:e.target.value,
            }
        }
        updateApiScene(param).then(()=>{
            findApiScene(apiSceneId).then(res=>{
                setDetailInfo(res);
            })
        })
    }

    const toHistory = () =>{
        props.history.push("/repository/api-scene-instance")
    }

    const goBack = () =>{
        props.history.push("/repository/testcase")
    }


    return(
        <div className={"content-box-center"}>
            <div style={{"display":"flex","justifyContent":"space-between","margin":"5px  0 0 0"}}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item onClick={goBack} className={"first-item"}>测试用例</Breadcrumb.Item>
                    <Breadcrumb.Item>{detailInfo?.testCase.name}</Breadcrumb.Item>
                </Breadcrumb>

            </div>

            <DetailCommon
                type={true}  //用于显示里面操作按钮的。如性能页绑定的场景用，点击进入不用加type
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
                        <ApiSceneTestResult/>
                    </>
                }
            />

            <ApiSceneStepList type={"apiScene"}  {...props}/>
        </div>
    )


}

export default inject('apiSceneStore')(observer(ApiScenePage));
