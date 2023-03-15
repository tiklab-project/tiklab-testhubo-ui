import React, {useEffect, useState} from "react";
import {Button, Collapse, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import DeleteRepositoryModal from "./DeleteRepositoryModal";

const { Panel } = Collapse;
const {TextArea} = Input;


const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 1 },
};

/**
 * 仓库设置页
 */
const RepositorySetting = (props) =>{
    const {repositoryStore} = props;
    const {updateRepository,findRepository,deleteRepository} = repositoryStore;

    let repositoryId = sessionStorage.getItem("repositoryId");
    const [form] = Form.useForm();

    const [repositoryDetail, setRepositoryDetail] = useState();
    const [repositoryName, setRepositoryName] = useState();
    const [visibility, setVisibility] = useState(1);

    useEffect(()=>{
        findRepository(repositoryId).then(res=>{
            setRepositoryDetail(res)
            setRepositoryName(res.name)
            setVisibility(res.visibility)
            form.setFieldsValue({
                name: res.name,
                desc:res.desc
            })
        })
    },[repositoryId])

    const onFinish = (values) =>{
        values.visibility=visibility;
        let param = {
            id:repositoryId,
            iconUrl:repositoryDetail?.iconUrl,
            ...values,
        }

        updateRepository(param);
    }


    return(
        <div className={"ws-setting-flex"}>
            <div className={"ws-setting-box"}>
                <div  className={"header-box-space-between"} >
                    <div className={'header-box-title'}>仓库信息</div>
                </div>

                <Collapse  defaultActiveKey={['1']} >
                    <Panel header="编辑仓库" key="1">
                        <div>
                            <Form
                                className='ws-edit-modal-form'
                                form={form}
                                preserve={false}
                                layout={"vertical"}
                                onFinish={onFinish}
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 20 }}
                            >
                                <Form.Item
                                    label="应用名称"
                                    rules={[{ required: true, message: '添加目录名称!' }]}
                                    name="name"
                                >
                                    <Input style={{height:40}}/>
                                </Form.Item>
                                <Form.Item
                                    label="可见范围"
                                    name="visibility"
                                >
                                    <div className={"ws-setting-edit-visibility"}>
                                        <div className={`ws-edit-visibility-item ${visibility===0?"ws-edit-visibility-action":null}`} onClick={()=>setVisibility(0)}>
                                            <div style={{"display":"flex","alignItems":"center"}}>
                                                <svg style={{width:20,height:20}} aria-hidden="true">
                                                    <use xlinkHref= {`#icon-suoding`} />
                                                </svg>
                                                <span>公共</span>
                                            </div>
                                            <div className={"ws-edit-visibility-item-desc"}>公共项目，全部成员可见</div>
                                        </div>

                                        <div className={`ws-edit-visibility-item  ${visibility===1?"ws-edit-visibility-action":null}`}  onClick={()=>setVisibility(1)}>
                                            <div style={{"display":"flex","alignItems":"center"}} >
                                                <svg style={{width:20,height:20}} aria-hidden="true">
                                                    <use xlinkHref= {`#icon-jiesuo`} />
                                                </svg>
                                                <span>私密</span>
                                            </div>
                                            <div className={"ws-edit-visibility-item-desc"}>私密项目，只有项目成员可见</div>
                                        </div>

                                    </div>
                                </Form.Item>
                                <Form.Item
                                    label="描述"
                                    name="desc"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                                <Form.Item {...formItemLayout}>
                                    <Button type="primary" htmlType="submit" style={{ width: 100,height: 36}}>  保存 </Button>
                                </Form.Item>
                            </Form>


                        </div>

                    </Panel>
                    <Panel header="删除仓库" key="2">
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div>
                                <div  style={{fontWeight:"bold"}}>删除此仓库</div>
                                <div className={"ws-setting-delete"}>删除存储库后，将无法返回。请确定</div>
                            </div>

                            <DeleteRepositoryModal
                                repositoryStore={repositoryStore}
                                repositoryName={repositoryName}
                                {...props}
                            />
                        </div>

                    </Panel>
                </Collapse>
            </div>

        </div>

    )
}

export default inject("repositoryStore")(observer(RepositorySetting));