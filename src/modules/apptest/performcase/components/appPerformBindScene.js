import React from "react";
import { Modal, Table} from "antd";
import {inject, observer} from "mobx-react";
import IconBtn from "../../../common/iconBtn/IconBtn";

const AppPerformBindScene = (props) =>{
    const {appSceneStore,appPerfStepStore,appPerfId} = props;
    const {findAppSceneList,appSceneList} = appSceneStore;

    const {bindAppScene, findAppPerfStepList} = appPerfStepStore;

    const column =[
        {
            title: '场景名称',
            dataIndex:  ['testCase','name'],
            key: 'name',
            // width: "30%",
        },{
            title: '类型',
            dataIndex: ['testCase','testType'],
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
        findAppSceneList({caseType: "app-scene", testType: "auto"});
        setVisible(true);
    };


    // 提交
    const onFinish = async () => {
        bindAppScene(selectItem).then(()=>findAppPerfStepList(appPerfId))

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
                    dataSource={appSceneList}
                    rowKey = {record => record.id}
                    rowSelection={{...rowSelection}}
                    pagination={false}
                />

            </Modal>
        </>
    )
}

export default inject("appSceneStore")(observer(AppPerformBindScene));