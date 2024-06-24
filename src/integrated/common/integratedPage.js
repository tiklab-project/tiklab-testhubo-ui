import React, {useEffect, useState} from "react";
import { observer} from "mobx-react";
import WorkspaceFindList from "../postin/workspaceBind/components/WorkspaceFindList";
import "./intergatedStyle.scss"
import workspaceBindStore from "../postin/workspaceBind/store/WorkspaceBindStore";
import {Button, Col,Row, Collapse, Form, Input} from "antd";
import integratedUrlStore from "../postin/postinUrl/store/IntegratedUrlStore";
const { Panel } = Collapse;

const IntegratedPage = (props) =>{
    const {findWorkspaceBindList,workspaceName} = workspaceBindStore
    const {findIntegratedUrlList,createIntegratedUrl,updateIntegratedUrl} = integratedUrlStore;

    const [form] = Form.useForm();
    const [postInCurUrlData, setPostInCurData] = useState();
    const [isPostInUrl, setIsPostInUrl] = useState(false);
    const [teamWireCurData, setTeamWireCurData] = useState();
    const repositoryId = sessionStorage.getItem("repositoryId")


    useEffect(()=>{
        findWorkspaceBindList({repositoryId:repositoryId})
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
                    postInUrl:integratedUrl
                })
            }else {
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
                    teamWireUrl:list[0].url
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



    return(
        <Row>
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
                <Panel header={<><span style={{padding:"0 5px"}}>POSTIN集成</span></>} key="1">
                    <div className={"url-config-box"}>
                        <Form
                            form={form}
                            layout="vertical"
                            preserve={false}
                            onFinish={(e)=>setUrl(e,"postin",postInCurUrlData)}
                        >
                            <Form.Item
                                label="POSTIN服务端地址"
                                name="postInUrl"
                                // rules={[{ required: true, message: 'Please input your LOGIN_URL!' }]}
                            >
                                <Input />
                            </Form.Item>
                            {
                                isPostInUrl
                                    ?<div className={"integrated_workspace-bind display-flex-between"}>
                                        <div><span>空间名 :</span> {workspaceName }</div> <WorkspaceFindList />
                                    </div>
                                    :null
                            }

                            <Form.Item >
                                <Button type="primary" htmlType="submit" style={{ width: 100,height: 36}}>  保存 </Button>
                            </Form.Item>
                        </Form>
                    </div>


                </Panel>
                <Panel header={<><span style={{padding:"0 5px"}}>KANASS集成</span></>} key="2">
                    <div className={"url-config-box"}>
                        <Form
                            form={form}
                            layout="vertical"
                            preserve={false}
                            onFinish={(e)=>setUrl(e,"teamwire",teamWireCurData)}
                        >
                            <Form.Item
                                label="KANASS服务端地址"
                                name="teamWireUrl"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" htmlType="submit" style={{ width: 100,height: 36}}>  保存 </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
            </Col>
        </Row>
    )
}

export default observer(IntegratedPage);