import React, {useEffect} from "react";
import {Button, Input, Modal, Table} from "antd";
import {inject, observer} from "mobx-react";

const FuncSceneBindUnit =(props) =>{
    const {funcUnitStore,funcSceneStepStore,funcSceneId} = props;
    const {findFuncUnitList,funcUnitList} = funcUnitStore;

    const {bindFuncUnit,findFuncSceneStepList} = funcSceneStepStore;

    const column =[
        {
            title: 'UnitCase名',
            dataIndex:  ['testCase','name'],
            key: 'name',
            width: "30%",
        },
        {
            title: `类型`,
            dataIndex: ['testCase','testType'],
            key: "testType",
        },
        // {
        //     title: `等级`,
        //     dataIndex: "level",
        //     key: "level",
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

        findFuncUnitList({caseType: "unit", testType: "func"});

        setVisible(true);
    };


    // 提交
    const onFinish = async () => {
        bindFuncUnit(selectItem).then(()=>findFuncSceneStepList(funcSceneId))

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
            <Button className="important-btn" onClick={showModal}>关联测试用例</Button>
            <Modal
                destroyOnClose={true}
                title="关联用例"
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={800}
            >

                <Table
                    columns={column}
                    dataSource={funcUnitList}
                    rowKey = {record => record.id}
                    rowSelection={{...rowSelection}}
                    pagination={false}
                />

            </Modal>
        </>
    )
}

export default inject("funcUnitStore")(observer(FuncSceneBindUnit));