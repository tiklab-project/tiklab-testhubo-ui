import React,{useEffect,useState} from 'react';
import { inject,observer } from 'mobx-react';
import ApiSceneStepList from "./apiSceneStepList";
import ApiSceneTestResult from "./apiSceneTestResult";
import DetailCommon from "../../../../../common/DetailCommon";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import {useHistory, useParams} from "react-router";
import {Breadcrumb} from "antd";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";

const ApiScenePage = (props) => {
    const {apiSceneStore} = props;
    const {findApiScene,updateApiScene} = apiSceneStore;

    const history = useHistory();
    const [detailInfo,setDetailInfo]=useState();

    let {id} = useParams()
    const apiSceneId = sessionStorage.getItem('apiSceneId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiSceneId',id);

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

    return(
        <div className={"content-box-center"}>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item>用例详情</Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
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
                            onClick={()=>history.push("/repository/testcase/api-scene-instance")}
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
