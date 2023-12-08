import React, {useEffect, useState} from "react";
import apiPerfTestDataStore from "../store/apiPerfTestDataStore"
import {Row, Input, Col, Modal, Upload, Button} from "antd";
import {observer} from "mobx-react";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import UpLoadTestData from "./UpLoadTestData";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";
import {csvParse} from 'd3-dsv';

const ApiPerfTestDataDetail = (props) =>{
    const {apiPerfId,findPage,type,testDataId} = props;
    const {
        createApiPerfTestData,
        updateApiPerfTestData,
        findApiPerfTestDataList,
        findApiPerfTestData,
    } = apiPerfTestDataStore

    const [name, setName] = useState();
    const [testDataInfo, setTestDataInfo] = useState();
    const [testDataValue, setTestDataValue] = useState();
    const [testDataTable, setTestDataTable] = useState([]);
    const [visible, setVisible] = React.useState(false);

    const showModal = async () => {
        if(type==="edit"){
            let info =  await findApiPerfTestData(testDataId)
            setTestDataInfo(info)
            setName(info.name)
            if(info){
                setTestDataTable(csvParse(info?.testData))
            }else {
                setTestDataTable([])
            }
        }

        setVisible(true);
    }

    const cancel = () =>{
        setTestDataInfo(null)
        setVisible(!visible)
    }

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

        setVisible(false);
    }


    const showBtn = ()=>{
        if(type==="edit"){
            return  <a onClick={showModal}>{props.name}</a>
        }else {
            return <IconBtn
                className="pi-icon-btn-grey"
                onClick={showModal}
                name={props.name}
            />
        }
    }


    return(
        <>
            {showBtn()}
            <Modal
                destroyOnClose={true}
                title={props.name}
                visible={visible}
                onCancel={cancel}
                onOk={save}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Row gutter={10} >
                    <Col span={20}>
                        <Input
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            placeholder={"未设置测试数据名"}
                            className={"test-data-name"}
                        />
                    </Col>
                    <Col span={4} >
                        <Upload beforeUpload={beforeUpload} showUploadList={false}>
                            <IconBtn
                                className="pi-icon-btn-grey"
                                name={"导入CSV"}
                            />
                        </Upload>
                    </Col>
                </Row>
                <UpLoadTestData testDataTable={testDataTable}/>
            </Modal>
        </>

    )
}

export default observer(ApiPerfTestDataDetail);