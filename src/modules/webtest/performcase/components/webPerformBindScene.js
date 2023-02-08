import React from "react";
import {Modal, Table} from "antd";
import {inject, observer} from "mobx-react";
import IconBtn from "../../../common/iconBtn/IconBtn";

const WebPerformBindScene = (props) =>{
    const {webSceneStore,webPerfStepStore,webPerfId} = props;
    const {findWebSceneList,webSceneList} = webSceneStore;

    const {bindWebScene, findWebPerfStepList} = webPerfStepStore;

    const column =[
        {
            title: '场景名称',
            dataIndex: ['testCase','name'],
            key: 'name',
            // width: "30%",
        },{
            title: '类型',
            dataIndex:['testCase','testType'],
            key: 'testType',
            // width: "30%",
        },
        {
            title: `创建时间`,
            dataIndex: ['testCase','createTime'],
            key: "createTime",
        },
    ]

    const [visible, setVisible] = React.useState(false);
    const [selectItem, getSelectItem] = React.useState([]);

    // 弹框展示
    const showModal = () => {
        findWebSceneList({caseType: "web-scene", testType: "auto"});

        setVisible(true);
    };


    // 提交
    const onFinish = async () => {
        bindWebScene(selectItem).then(()=>findWebPerfStepList(webPerfId))

        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            getSelectItem(selectedRowKeys)
        },
    };

    return(
        <>
            <IconBtn
                className="pi-icon-btn-grey"
                name={"关联场景"}
                onClick={showModal}
            />
            <Modal
                destroyOnClose={true}
                title="关联场景"
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={1000}
            >

                <Table
                    columns={column}
                    dataSource={webSceneList}
                    rowKey = {record => record.id}
                    rowSelection={{...rowSelection}}
                    pagination={false}
                />

            </Modal>
        </>
    )
}

export default inject("webSceneStore")(observer(WebPerformBindScene));