import React, {useEffect, useState} from "react";
import {Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";

const PostinUrlConfig = (props) =>{
    const {postinUrlStore} = props;
    const {findPostinUrlList,createPostinUrl,updatePostinUrl} = postinUrlStore;

    const [form] = Form.useForm();
    const [postInCurUrlData, setPostInCurData] = useState();


    const [teamWireCurData, setTeamWireCurData] = useState();

    useEffect(()=>{
        let param = {
            userId:getUser().userId,
            projectName: "postin"
        }
        findPostinUrlList(param).then(list=>{
            if(list!==null&&list.length>0){

                let postInInfo = {
                    list:list,
                    curData:list[0],
                }
                setPostInCurData(postInInfo)

                let postinUrl = list[0].url;
                form.setFieldsValue({
                    postInUrl:postinUrl
                })
            }else {
                setPostInCurData({list:[]})
            }
        })
    },[])
    
    useEffect(()=>{
        let param = {
            userId:getUser().userId,
            projectName: "teamwire"
        }
        findPostinUrlList(param).then(list=>{
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
    },[])

    /**
     * 公共方法
     * 设置地址
     */
    const setUrl = async (e,projectName,curUrlData) =>{
        let url = {url:e.target.value};

        if(curUrlData.list.length>0){
            let param = {
                ...curUrlData.curData,
                ...url,
            }
            updatePostinUrl(param)
        }else {
            let param ={
                projectName:projectName,
                userId:getUser().userId,
                ...url,
            }

            createPostinUrl(param)
        }
    }



    return(
        // <div className={"content-box-center"}>
        <>
            {/*<div  className={"header-box-space-between"} >*/}
            {/*    <div className={'header-box-title'}>集成地址配置</div>*/}
            {/*</div>*/}
            <div className={"url-config-content"}>
                <div className={"url-config-detail"} style={{margin:"0 10px 0 0"}}>
                    <div className={"url-config-title"}>Postin配置</div>
                    <div className={"url-config-form"}>
                        <div className={"url-config-box"}>
                            <Form
                                form={form}
                                layout="vertical"
                                preserve={false}
                            >
                                <Form.Item
                                    label="服务端地址"
                                    name="postInUrl"
                                    rules={[{ required: true, message: 'Please input your LOGIN_URL!' }]}
                                >
                                    <Input onBlur={(e)=>setUrl(e,"postin",postInCurUrlData)}/>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className={"url-config-detail"}>
                    <div className={"url-config-title"}>TeamWire配置</div>
                    <div className={"url-config-form"}>
                        <div className={"url-config-box"}>
                            <Form
                                form={form}
                                layout="vertical"
                                preserve={false}
                            >
                                <Form.Item
                                    label="服务端地址"
                                    name="teamWireUrl"
                                    rules={[{ required: true, message: 'Please input your LOGIN_URL!' }]}
                                >
                                    <Input onBlur={(e)=>setUrl(e,"teston",teamWireCurData)}/>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default inject("postinUrlStore")(observer(PostinUrlConfig));