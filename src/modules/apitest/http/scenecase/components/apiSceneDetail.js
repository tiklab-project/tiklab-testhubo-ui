import React,{useEffect,useState} from 'react';
import { inject,observer } from 'mobx-react';
import ApiSceneStepList from "./apiSceneStepList";
import BackCommon from "../../../../common/backCommon";
import ApiEnvSelect from "../../../../sysmgr/environment/components/apiEnvSelect";
import ApiSceneTestResult from "./apiSceneTestResult";

const ApiSceneDetail = (props) => {
    const {apiSceneStore} = props;
    const {findApiScene,updateApiScene} = apiSceneStore;

    const [baseInfo,setBaseInfo]=useState();
    const [editTitle,setEditTitle] = useState()
    const [createUser, setCreateUser] = useState();
    const [updateUser, setUpdateUser] = useState();
    const [category, setCategory] = useState();
    const [updateTime, setUpdateTime] = useState();

    const apiSceneId = sessionStorage.getItem('apiSceneId');
    useEffect(()=>{
        findApiScene(apiSceneId).then(res=>{
            setBaseInfo(res);
            setEditTitle(res.name)
            setCreateUser(res.createUser?.name);
            setUpdateUser(res.updateUser?.name);
            setCategory(res.category?.name);
            setUpdateTime(res.updateTime);
        })
    },[apiSceneId])

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


    const goBack = () =>{
        props.history.push("/repositorypage/apitest")
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
                        <ApiSceneTestResult />
                        {/*<Button onClick={onTest}>执行测试</Button>*/}
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
        </>
    )


}

export default inject('apiSceneStore')(observer(ApiSceneDetail));
