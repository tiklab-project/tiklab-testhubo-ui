import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Popconfirm, Row, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../../common/IconCommon";
import WorkItemAdd from "./WorkItemAdd";
import {applyJump} from "tiklab-core-ui"
import "./workItemStyle.scss"
import workItemBindStore from "../store/WorkItemBindStore";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import DefectSelect from "./DefectSelect";
import ProjectSelect from "../../workItem/components/ProjectSelect";
/**
 * 绑定的缺陷列表
 */
const WorkItemBindList = (props) =>{
    const {caseId} = props;
    const {findWorkItemBindList,workItemBindList,deleteWorkItemBind} = workItemBindStore

    //列表头
    const columns = [
        {
            title:`缺陷名称`,
            dataIndex: ["workItem","name"],
            key: "name",
            render:(text,record)=>(
                <a onClick={()=>toWorkItem(record)}>{text}</a>
            )
        },
        {
            title: `项目`,
            dataIndex:["workItem","projectName"],
            key: "projectName",
        },
        {
            title: `状态`,
            dataIndex: ["workItem","status"],
            key: "status",
        },
        {
            title: `优先级`,
            dataIndex: ["workItem","priority"],
            key: "priority",
        },
        {
            title: `创建时间`,
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: `操作`,
            key: "action",
            width:"10%",
            // align:"center",
            render: (text, record) => (
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteWorkItemBind(record.id).then(()=> findWorkItemBindList({caseId:caseId}))}
                    okText='确定'
                    cancelText='取消'
                >
                    <IconCommon
                        className={"icon-s edit-icon"}
                        icon={"shanchu3"}
                    />
                </Popconfirm>
            )
        },
    ]

    const [form] = Form.useForm();
    const [showAdd, setShowAdd] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const [selectProjectId, setSelectProjectId] = useState();

    useEffect(async ()=>{
        await findWorkItemBindList({caseId:caseId})
    },[])

    const toWorkItem = (record)=>{
        try{
            if(IS_DEV){
                applyJump(`${teamwireUrl}/#/index/projectDetail/${record.workItem.projectId}/workDetail/${record.workItem.id}`,'_blank')
            }else {
                applyJump(`${record.projectUrl}/#/index/projectDetail/${record.workItem.projectId}/workDetail/${record.workItem.id}`,'_blank')
            }
        }catch {
            applyJump(`${record.projectUrl}/#/index/projectDetail/${record.workItem.projectId}/workDetail/${record.workItem.id}`,'_blank')
        }
    }

    const clickProject = (projectId)=>{
        setSelectProjectId(projectId)
    }

    return(
        <div >
            <div className={`${showSelect?"demand_hide":"demand_show"}`}>
                <div style={{margin:'10px 0'}}>
                   <div className={`${showAdd?"demand_hide":"demand_show"}`} >
                       <div style={{display:"flex",gap:"10px"}}>
                           <IconBtn
                               className="pi-icon-btn-grey"
                               name={"关联缺陷"}
                               onClick={()=>setShowSelect(true)}
                           />
                           {/*<WorkItemAdd caseId={caseId} />*/}
                           <IconBtn
                               className="pi-icon-btn-grey"
                               name={"添加缺陷"}
                               onClick={()=>setShowAdd(true)}
                           />
                       </div>

                   </div>
                    <div  className={`${showAdd?"demand_show":"demand_hide"}`}>
                        <Form
                            form={form}
                            preserve={false}
                            layout={"inline"}
                        >
                            <Form.Item
                                rules={[{ required: true, }]}
                                name="project"
                                style={{ width: '60%' }}
                            >
                                <Input placeholder={"缺陷名称"}/>
                            </Form.Item>
                            <Form.Item
                                rules={[{ required: true}]}
                                name="name"
                                style={{ width: '20%' }}
                            >
                                <ProjectSelect
                                    clickProject={clickProject}
                                    {...props}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{ width: '15%' }}
                            >
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        添加
                                    </Button>
                                    <IconBtn
                                        className="pi-icon-btn-grey"
                                        onClick={()=>setShowAdd(false)}
                                        name={"取消"}
                                    />
                                </Space>

                            </Form.Item>
                        </Form>
                    </div>
                </div>


                <div className={"table-list-box"} style={{borderTop:"1px solid #e4e4e4"}}>
                    <Table
                        className="tablelist"
                        columns={columns}
                        dataSource={workItemBindList}
                        rowKey={record => record.id}
                        pagination={false}
                        showHeader={false}
                    />
                </div>
            </div>
            <div className={`defect_project_select ${showSelect?"demand_show":"demand_hide"}` }>
                <DefectSelect setShowSelect={setShowSelect} caseId={caseId}/>
            </div>

        </div>

    )
}

export default observer(WorkItemBindList);