import React, {useEffect, useState} from "react";
import {Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";

const PostinUrlConfig = (props) =>{
    const {postinUrlStore} = props;
    const {findPostinUrlList,createPostinUrl,updatePostinUrl} = postinUrlStore;

    const [form] = Form.useForm();
    const [urlList, setUrlList] = useState([]);
    const [curUrlData, setCurUrlData] = useState();

    useEffect(()=>{
        findPostinUrlList({userId:getUser().userId}).then(list=>{
            if(list!==null&&list.length>0){
                setUrlList(list)
                setCurUrlData(list[0])

                let postinUrl = list[0].url;
                form.setFieldsValue({
                    url:postinUrl
                })
            }
        })
    },[])


    const setPostinUrl = async () =>{
        let fieldsValue = await form.getFieldsValue();
        if(urlList.length>0){
            let param = {
                ...curUrlData,
                ...fieldsValue,
            }
            updatePostinUrl(param)
        }else {
            let param ={
                userId:getUser().userId,
                ...fieldsValue
            }

            createPostinUrl(param).then(()=>{
                findPostinUrlList({userId:getUser().userId}).then(list=>{
                    setUrlList(list)
                })
            })
        }
    }

    return(
        <div className={"content-box-center"}>
            <div  className={"header-box-space-between"} >
                <div className={'header-box-title'}>Postin配置</div>
            </div>
            <div className={"url-config-content"}>
                <div className={"url-config-detail"}>
                    <div className={"url-config-title"}>Postin配置</div>
                    <div className={"url-config-form"}>
                        <div className={"url-config-box"}>
                            <Form
                                name="basic"
                                form={form}
                                layout="vertical"
                                preserve={false}
                            >
                                <Form.Item
                                    label="服务端地址"
                                    name="url"
                                    rules={[{ required: true, message: 'Please input your LOGIN_URL!' }]}
                                >
                                    <Input onBlur={setPostinUrl}/>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default inject("postinUrlStore")(observer(PostinUrlConfig));