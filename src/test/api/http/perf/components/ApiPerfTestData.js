import React, {useState} from "react";
import {Upload} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import {Axios} from "tiklab-core-ui";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";

const { Dragger } = Upload;

const ApiPerfTestData = () =>{

    //上传的文件
    const [fileList,setFileList] = useState([]);
    //判断是否效验正确
    const [valid, setValid] = useState(false);

    /**
     * 上传前效验
     */
    const beforeUpload = async (file) => {
        try {
            // 获取文件类型
            const fileType = file.type;

            // 检查文件类型
            if (fileType !== 'text/csv') {
                setValid(false)
                messageFn("error",'文件必须为csv格式');

                return;
            }

            setValid(true)
        } catch (error) {
            setValid(false)
            messageFn("error",'文件必须为csv格式');
        }

        return false;
    };

    /**
     * 上传
     */
    const handleChange = async ({ file }) => {

        if(file.status==="removed"){
            setValid(false);
        }else {
            if(valid){
                setFileList([file])
                const params = new FormData();
                params.append("file",file)

                // 发送上传请求
                Axios.post('/apiPerfCase/importTestData', params)
                    .then(res=>{
                        if(res.code===0&&res.data===1){
                            messageFn("success",'上传成功');
                        }
                    })

            }else {
                setFileList([]);
            }
        }
    }


    return(
        <div style={{height:200}}>
            <Dragger
                beforeUpload={beforeUpload}
                fileList={fileList}
                onChange={handleChange}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-hint">
                    上传CSV类型的测试数据文件
                </p>
            </Dragger>
        </div>

    )
}
export default ApiPerfTestData;