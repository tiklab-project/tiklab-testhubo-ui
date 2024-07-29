import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import apiSceneStepStore from "../store/apiSceneStepStore";
import {Col, Input, Modal, Row, Table} from "antd"
import {SearchOutlined} from "@ant-design/icons";
import PaginationCommon from "../../../../../common/pagination/Page";
import IconCommon from "../../../../../common/IconCommon";

const ApiSceneBindUnit =(props) =>{
    const {findList,apiSceneId,apiSceneStore} = props;
    const {apiSceneStepWillBindCaseData,findApiSceneStepWillBindCasePage,bindApiUnit} = apiSceneStepStore
    const {findApiScene} = apiSceneStore

    const column =[
        {
            title: '名称',
            dataIndex: 'name',
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
            dataIndex: ['createUser', 'nickname'],
            key: "user",
            width: "20%",
        }
    ]

    let repositoryId = sessionStorage.getItem("repositoryId");
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        findApiSceneStepWillBindCasePage({
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            repositoryId:repositoryId,
            apiSceneId: apiSceneId
        }).then(res=>{
            setTotalPage(res.totalPage)
        });
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // 提交
    const onFinish = async (id) => {
        await bindApiUnit([id],apiSceneId)
        await findList()
        await findPage()
        await findApiScene(apiSceneId)
    };

    const findPage = (params) =>{
        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            repositoryId:repositoryId,
            apiSceneId:apiSceneId,
            ...params
        }
        findApiSceneStepWillBindCasePage(param).then((res)=>{
            setTotalPage(res.totalPage);
        })
    }


    const onSearch = (e) =>{
        findPage({name:e.target.value})
    }

    // 分页
    const onTableChange = (current) => {
        setCurrentPage(current)
        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:current
            },
        }

        findPage(param)
    }


    return(
        <>
            <a onClick={showModal}>关联用例</a>
            <Modal
                title="未关联接口单元"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                footer={false}
            >
                <div style={{padding:"0 0 15px"}}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <Input
                                placeholder={`搜索名称`}
                                onPressEnter={onSearch}
                                onChange={onSearch}
                                className='demand_project_search'
                                prefix={<IconCommon
                                    icon={"sousuo"}
                                    className={"icon-m"}
                                />}
                            />
                        </Col>
                    </Row>
                </div>
                <div style={{"overflow": "auto","height": "calc(100% - 38px)"}}>
                    <div className={"table-list-box"} >
                        <Table
                            columns={column}
                            dataSource={apiSceneStepWillBindCaseData?.dataList}
                            rowKey = {record => record.id}
                            onRow={(record) => {
                                return {
                                    onClick: () => {onFinish(record.id)},
                                    style: {cursor: 'pointer'}
                                };
                            }}
                            pagination={false}
                        />
                        <PaginationCommon
                            currentPage={currentPage}
                            totalPage={totalPage}
                            changePage={onTableChange}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default inject("apiUnitStore","apiSceneStore")(observer(ApiSceneBindUnit));