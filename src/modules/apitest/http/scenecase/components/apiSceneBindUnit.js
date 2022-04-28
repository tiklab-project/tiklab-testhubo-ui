import React, {useEffect} from "react";
import {Button, Input, Modal, Table} from "antd";
import {inject, observer} from "mobx-react";

const ApiSceneBindUnit =(props) =>{
    const {apiUnitStore,apiSceneStepStore} = props;
    const {findApiUnitPage,apiUnitList} = apiUnitStore;

    const {bindApiUnit} = apiSceneStepStore;

    const column =[
        {
            title: '用例名称',
            dataIndex: ['testCase','name'],
            key: 'name',
            width: "30%",
        },{
            title: '请求类型',
            dataIndex: 'methodType',
            key: 'methodType',
            width: "20%",
        },{
            title: '路径',
            dataIndex:  'path',
            key: 'path',
            width: "20%",
        },{
            title: `创建人`,
            dataIndex: ['testCase','user', 'name'],
            key: "user",
            width: "20%",
        }
    ]

    const [visible, setVisible] = React.useState(false);
    const [selectItem, getSelectItem] = React.useState([]);

    // 弹框展示
    const showModal = () => {
        findApiUnitPage({caseType: "unit", testType: "api"});

        setVisible(true);
    };


    // 提交
    const onFinish = async () => {
        bindApiUnit(selectItem)

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
            <Button className="important-btn" onClick={showModal}>关联用例</Button>
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
                {/*<Input*/}
                {/*    placeholder={`搜索`}*/}
                {/*    // onPressEnter={onSearch}*/}
                {/*    className='search-input'*/}
                {/*    style={{width:240}}*/}
                {/*/>*/}

                <Table
                    columns={column}
                    dataSource={apiUnitList}
                    rowKey = {record => record.id}
                    rowSelection={{...rowSelection}}
                />

            </Modal>
        </>
    )
}

export default inject("apiUnitStore")(observer(ApiSceneBindUnit));