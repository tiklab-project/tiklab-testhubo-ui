import React,{useEffect,useState} from 'react';
import { Form, Button} from 'antd';
import { inject,observer } from 'mobx-react';
import ApiSceneStepList from "./apiSceneStepList";
import ApiSceneTest from "./apiSceneTest";
import BackCommon from "../../../../common/backCommon";
import ApiEnvSelect from "../../apitest/apiEnvSelect";

const ApiScenecaseDetail = (props) => {
    const {apiSceneStore,stepStore} = props;
    const {findApiScene,updateApiScene} = apiSceneStore;
    const {
        findStepPage,
        deleteStep,
        stepList,
        totalRecord,
        getSelectItem
    } = stepStore;

    const [showResponse, setShowResponse] = useState(false);

    const [baseInfo,setBaseInfo]=useState();
    const [editTitle,setEditTitle] = useState("SceneName")
    const [createUser, setCreateUser] = useState("user");
    const [updateUser, setUpdateUser] = useState("user");
    const [category, setCategory] = useState("目录");
    const [updateTime, setUpdateTime] = useState("2022-22-22-");


    const [form] = Form.useForm()

    const sceneId = sessionStorage.getItem('sceneId');
    useEffect(()=>{
        findApiScene(sceneId).then(res=>{
            setBaseInfo(res);
            setEditTitle(res.name)
            setCreateUser(res.createUser?.name);
            setUpdateUser(res.updateUser?.name);
            setCategory(res.category?.name);
            setUpdateTime(res.updateTime);
            form.setFieldsValue({
                type:res.type,
                person:res.user.name,
                createTime:res.createTime
            })
        })
    },[])

    useEffect(()=> {
        findStepPage(sceneId);
    },[sceneId])


    //
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            getSelectItem(selectedRows)
        },
    };

    const updateTitle = (value) =>{
        const param = {
            name:value.target.innerText,
            type:baseInfo.type,
            desc:baseInfo.desc,
            id:baseInfo.id,
            repository:{
                id:baseInfo.repository.id
            }
        }
        updateApiScene(param)
    }

    const toHistory = () =>{
        props.history.push("/repositorypage/apitest/scenecase-instance")
    }


    const onTest = ()=>{
        setShowResponse(true)
    }

    const goBack = () =>{
        props.history.push("/repositorypage/apitest/scenecase")
    }

    return(
        <>
            <BackCommon clickBack={goBack} right={<ApiEnvSelect history={props.history}/>} />
            <div className={'testcase-webUI-form'}>
                <div className="web-form-header">
                    <div
                        className='teststep-title'
                        contentEditable={true}
                        suppressContentEditableWarning  //去掉contentEditable 提示的页面警告
                        onBlur={updateTitle}
                    >
                        {editTitle}
                    </div>
                    <div>
                        <a onClick={toHistory}>测试历史</a>
                        <Button onClick={onTest}>执行测试</Button>
                    </div>

                </div>
                <div className={"method-people-info"}>
                    <span className={"people-item "}>分组: {category}</span>
                    <span className={"people-item "}>创建人: {createUser}</span>
                    <span className={"people-item "}>更新者: {updateUser}</span>
                    <span className={"people-item "}>更新时间: {updateTime}</span>
                </div>
            </div>
            <div className={'test-title'}>
                <div>测试步骤</div>
            </div>
            <ApiSceneStepList {...props}/>
            <div className={'test-title'}>
                <div>测试结果</div>
            </div>
            <ApiSceneTest showResponse={showResponse}/>
        </>
    )


}

export default inject('apiSceneStore','stepStore')(observer(ApiScenecaseDetail));
