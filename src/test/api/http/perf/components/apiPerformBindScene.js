import React, {useState} from "react";
import { observer} from "mobx-react";
import apiPerfStepStore from "../store/apiPerfStepStore";
import {Col, Input, Modal, Row, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import PaginationCommon from "../../../../../common/pagination/Page";
import IconBtn from "../../../../../common/iconBtn/IconBtn";

const ApiPerformBindScene = (props) =>{
    const {bindApiScene,findApiPerfStepList,findApiPerfStepWillBindCasePage,apiPerfStepWillBindCaseData} = apiPerfStepStore;

    const column =[
        {
            title: '场景名称',
            dataIndex: 'name',
            key: 'name',
            width: "35%",
        },{
            title: '类型',
            dataIndex:'caseType',
            key: 'testType',
            width: "15%",
        },{
            title: `创建人`,
            dataIndex: ['createUser', 'nickname'],
            key: "user",
            width: "25%",
        },
        {
            title: `创建时间`,
            dataIndex: 'createTime',
            key: "createTime",
            width: "25%",
        }
    ]

    const apiPerfId = sessionStorage.getItem('apiPerfId');
    const repositoryId = sessionStorage.getItem("repositoryId");
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
        findPage()

    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const findPage = (params) =>{
        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            repositoryId:repositoryId,
            apiPerfId:apiPerfId,
            ...params
        }
        findApiPerfStepWillBindCasePage(param).then((res)=>{
            setTotalPage(res.totalPage);
        })
    }


    // 弹框展示
    const onSearch = (e) => {
        findPage({name:e.target.value})
    };


    // 提交
    const onFinish = async (id) => {
        bindApiScene([id]).then(()=> {
            findApiPerfStepList(apiPerfId)
            findPage()
        });
    };

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
            <IconBtn
                className="pi-icon-btn-grey"
                name={"关联场景"}
                onClick={showModal}
            />
            <Modal
                title="关联"
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
                                prefix={<SearchOutlined />}
                            />
                        </Col>
                    </Row>
                </div>
                <div style={{"overflow": "auto","height": "calc(100% - 38px)"}}>
                    <div className={"table-list-box"} >
                        <Table
                            columns={column}
                            dataSource={apiPerfStepWillBindCaseData?.dataList}
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

export default observer(ApiPerformBindScene);