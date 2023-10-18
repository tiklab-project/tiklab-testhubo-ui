import React, {useEffect, useState} from "react";
import apiPerfTestDataStore from "../store/apiPerfTestDataStore"
import {Row, Input, Col, Button, Space, Upload} from "antd";
import {observer} from "mobx-react";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import UpLoadTestData from "./UpLoadTestData";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";
import {csvParse} from 'd3-dsv';

const ApiPerfTestDataDetail = (props) =>{
    const {cancel,testDataInfo,apiPerfId,findPage,setTestDataInfo} = props;
    const {
        createApiPerfTestData,
        updateApiPerfTestData,
        findApiPerfTestDataList,
        findApiPerfTestData,
    } = apiPerfTestDataStore

    const [name, setName] = useState();
    const [testDataValue, setTestDataValue] = useState();
    const [testDataTable, setTestDataTable] = useState([]);

    useEffect(()=>{
        if(testDataInfo){
            setTestDataTable(csvParse(testDataInfo?.testData))
        }else {
            setTestDataTable([])
        }
    },[testDataInfo])

    /**
     * 导入文件
     */
    const beforeUpload = async (file) => {
        try {
            // 获取文件类型
            const fileType = file.type;

            // 检查文件类型
            if (fileType !== 'text/csv') {
                messageFn("error",'文件必须为csv格式');
                return;
            }

            const reader = new FileReader();
            reader.onload = async (event) => {
                const text = event.target.result;
                let list = csvParse(text)

                setTestDataValue(text)
                setTestDataTable(list)
            };

            reader.readAsText(file);
        } catch (error) {
            messageFn("error",'文件必须为csv格式');
        }

        return false;
    };


    /**
     * 保存
     */
    const save = async () =>{
        let param ={
            name:name||"数据名称",
            type:"csv",
            caseId:apiPerfId,
            testData:testDataValue
        }

        if(testDataInfo){
            let mergeParam = {
                ...testDataInfo,
                ...param,
            }
            await updateApiPerfTestData(mergeParam)
        }else {
            let res = await createApiPerfTestData(param)
            let info = await findApiPerfTestData(res.data)
            setTestDataInfo(info)
        }
        await findPage()
    }


    return(
        <div style={{ height:" 100%",width: "calc(100% - 30px)"}}>
            <Row gutter={10} >
                <Col span={22}>
                    <Input
                        value={testDataInfo?.name}
                        onChange={(e)=>setName(e.target.value)}
                        placeholder={"未设置测试数据名"}
                        className={"test-data-name"}
                    />
                </Col>
                <Col span={2} >
                    <Upload beforeUpload={beforeUpload} showUploadList={false}>
                        <IconBtn
                            className="pi-icon-btn-grey"
                            name={"导入CSV"}
                        />
                    </Upload>

                </Col>
            </Row>
            <UpLoadTestData testDataTable={testDataTable}/>
            <div style={{position:"absolute",bottom:"240px"}}>
                <Space>
                    <Button
                        className={"important-btn"}
                        onClick={save}
                    >
                        保存
                    </Button>
                    <IconBtn
                        className="pi-icon-btn-grey"
                        onClick={cancel}
                        name={"取消"}
                    />
                </Space>
            </div>

        </div>
    )
}

export default observer(ApiPerfTestDataDetail);