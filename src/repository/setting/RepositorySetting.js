import React, {useEffect, useState} from "react";
import {Button, Col,Row, Collapse, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import DeleteRepositoryModal from "./DeleteRepositoryModal";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const { Panel } = Collapse;
const {TextArea} = Input;


const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 1 },
};

/**
 * 项目设置页
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
        <Row className={"repository-setting-info"}>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div  className={"header-box-space-between"}>
                    <div className={'header-box-title'}>项目信息</div>
                </div>
                <Collapse expandIconPosition={"end"} >
                    <Panel header={<>
                        <div><EditOutlined/> <span style={{padding:"0 5px"}}>编辑项目</span></div>
                        <div className={"collapse-panel-desc"}>项目基本信息修改</div>
                    </>} key="1">
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
                                    rules={[{ required: true, message: '添加应用名称!' }]}
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
                    <Panel header={<>
                        <div><DeleteOutlined />  <span style={{padding:"0 5px"}}>删除项目</span></div>
                        <div className={"collapse-panel-desc"}>删除当前项目，谨慎操作</div>
                    </>} key="2">
                        <div>
                            <div style={{display:"flex",alignItems:"center",margin:"0 0 10px 0"}}>
                                <div  style={{fontWeight:"bold"}}>删除此项目</div>
                                <div className={"ws-setting-delete"}>(删除存储库后,将无法返回)</div>
                            </div>

                            <DeleteRepositoryModal
                                repositoryStore={repositoryStore}
                                repositoryName={repositoryName}
                                {...props}
                            />
                        </div>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    )
}

export default inject("repositoryStore")(observer(RepositorySetting));