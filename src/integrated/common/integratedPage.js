import React, {useEffect, useState} from "react";
import { observer} from "mobx-react";
import WorkspaceFindList from "../postin/workspaceBind/components/WorkspaceFindList";
import "./intergatedStyle.scss"
import workspaceBindStore from "../postin/workspaceBind/store/WorkspaceBindStore";
import {Button, Col, Row, Collapse, Form, Input, Tooltip} from "antd";
import integratedUrlStore from "../postin/postinUrl/store/IntegratedUrlStore";
import {AppstoreOutlined, DeleteOutlined} from "@ant-design/icons";
import IntegratedEdit from "./IntegratedEdit";
const { Panel } = Collapse;

const IntegratedPage = (props) =>{
    const {findWorkspaceBindList,workspaceName,deleteWorkspaceBind} = workspaceBindStore
    const {findIntegratedUrlList,createIntegratedUrl,updateIntegratedUrl,deleteIntegratedUrl} = integratedUrlStore;

    const [form] = Form.useForm();
    const [postInCurUrlData, setPostInCurData] = useState();
    const [isPostInUrl, setIsPostInUrl] = useState(false);
    const [teamWireCurData, setTeamWireCurData] = useState();
    const repositoryId = sessionStorage.getItem("repositoryId")
    const [bindWorkspaceInfo, setBindWorkspaceInfo] = useState();

    useEffect(async ()=>{
        let bindWorkspace = findWorkspaceBindList({repositoryId:repositoryId})
        setBindWorkspaceInfo(bindWorkspace)
    },[])

    useEffect(()=>{
        findPostInList()
    },[])

    useEffect(()=>{
        findTeamWireList()
    },[])

    const findPostInList = () =>{
        let param = {
            repositoryId:repositoryId,
            projectName: "postin"
        }
        findIntegratedUrlList(param).then(list=>{
            if(list!==null&&list.length>0){
                setIsPostInUrl(true)
                let postInInfo = {
                    list:list,
                    curData:list[0],
                }
                setPostInCurData(postInInfo)

                let integratedUrl = list[0].url;
                form.setFieldsValue({
                    url:integratedUrl
                })
            }else {
                setIsPostInUrl(false)
                setPostInCurData({list:[]})
            }
        })
    }

    const findTeamWireList = () =>{
        let param = {
            repositoryId:repositoryId,
            projectName: "teamwire"
        }
        findIntegratedUrlList(param).then(list=>{
            if(list!==null&&list.length>0){
                let teamWireInfo = {
                    list:list,
                    curData:list[0],
                }
                setTeamWireCurData(teamWireInfo)

                form.setFieldsValue({
                    url:list[0].url
                })
            }else {
                setTeamWireCurData({list:[]})
            }
        })
    }

    /**
     * 公共方法
     * 设置地址
     */
    const setUrl = async (value,projectName,curUrlData) =>{
        let url;
        if(projectName==="postin"){
            url = {url:value.postInUrl};
        }else {
            url = {url:value.teamWireUrl};
        }

        if(curUrlData.list.length>0){
            let param = {
                ...curUrlData.curData,
                ...url,
            }
            await updateIntegratedUrl(param)

            if(projectName==="postin"){
                findPostInList()
            }else {
                findTeamWireList()
            }

        }else {
            let param ={
                projectName:projectName,
                repositoryId:repositoryId,
                ...url,
            }

            await createIntegratedUrl(param)
            if(projectName==="postin"){
                findPostInList()
            }else {
                findTeamWireList()
            }
        }
    }

    const deletePostInServer = async () =>{
        await deleteIntegratedUrl(postInCurUrlData?.curData?.id)
        await deleteWorkspaceBind(bindWorkspaceInfo?.id)
        await findPostInList()
    }

    return(
        <Row className={"integrated-content"}>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >

            <div  className={"header-box-space-between"} >
                <div className={'header-box-title'}>系统集成</div>
            </div>
            <Collapse  expandIconPosition={"end"} >
                <Panel header={
                    <>
                        <div><AppstoreOutlined /> <span style={{padding:"0 5px"}}>POSTIN集成</span></div>
                        <div className={"collapse-panel-desc"}>集成PostIn产品</div>
                    </>
                } key="1">
                    <div className={"url-config-box"}>
                        <Row className={"integrated-row-item"}>
                            <Col span={4}>服务地址</Col>
                            <Col span={16}>{postInCurUrlData?.curData?.url||"未设置"}</Col>
                            <Col span={3} className={"integrated-action"}>
                                <IntegratedEdit
                                    product={"postin"}
                                    type={postInCurUrlData?.curData?.url ?"edit":"add"}
                                    name={postInCurUrlData?.curData?.url ?"添加":"编辑"}
                                    findPostInList={findPostInList}
                                    findTeamWireList={findTeamWireList}
                                    curUrlData={postInCurUrlData}
                                    form={form}
                                    setUrl={setUrl}
                                />

                                {isPostInUrl && <Tooltip title={"删除"}><DeleteOutlined onClick={deletePostInServer}/></Tooltip>}
                            </Col>
                        </Row>
                        {
                            isPostInUrl&&<Row className={"integrated-row-item"}>
                                    <Col span={4}>空间名</Col>
                                    <Col span={16}>{workspaceName }</Col>
                                    <Col span={3}> <WorkspaceFindList /> </Col>
                                </Row>
                        }
                    </div>
                </Panel>
                <Panel header={<>
                    <div>
                        <AppstoreOutlined />
                        <span style={{padding:"0 5px"}}>KANASS集成</span>
                    </div>
                    <div className={"collapse-panel-desc"}>集成Kanass产品</div>
                </>} key="2">
                    <div className={"url-config-box"}>
                        <Row className={"integrated-row-item"}>
                            <Col span={4}>服务地址</Col>
                            <Col span={16}>{teamWireCurData?.curData?.url||"未设置"}</Col>
                            <Col span={3} className={"integrated-action"}>
                                <IntegratedEdit
                                    product={"teamwire"}
                                    type={teamWireCurData?.curData?.url ?"edit":"add"}
                                    name={teamWireCurData?.curData?.url ?"添加":"编辑"}
                                    findPostInList={findPostInList}
                                    findTeamWireList={findTeamWireList}
                                    curUrlData={teamWireCurData}
                                    form={form}
                                    setUrl={setUrl}
                                />

                                {teamWireCurData?.curData?.url && <Tooltip title={"删除"}><DeleteOutlined onClick={deletePostInServer}/></Tooltip>}
                            </Col>
                        </Row>
                    </div>
                </Panel>
            </Collapse>
            </Col>
        </Row>
    )
}

export default observer(IntegratedPage);