import React from "react";
import {Button, Input, Modal, Table} from "antd";
import {inject, observer} from "mobx-react";

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
        // {
        //     title: '等级',
        //     dataIndex: 'level',
        //     key: 'level',
        //     // width: "20%",
        // },
        {
            title: `创建时间`,
            dataIndex: ['testCase','createTime'],
            key: "user",
        },
    ]

    const [visible, setVisible] = React.useState(false);
    const [selectItem, getSelectItem] = React.useState([]);

    // 弹框展示
    const showModal = () => {
        findWebSceneList({caseType: "scene", testType: "web"});

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
            <Button className="important-btn" onClick={showModal}>关联场景</Button>
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