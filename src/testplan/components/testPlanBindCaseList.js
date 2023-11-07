import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Avatar, Empty, Popconfirm, Space, Table} from "antd";
import IconCommon from "../../common/IconCommon";
import {showCaseTypeInList, showCaseTypeTable, showTestTypeView} from "../../common/caseCommon/CaseCommonFn";
import emptyImg from "../../assets/img/empty.png";
import testPlanDetailStore from "../store/testPlanDetailStore";
import IconBtn from "../../common/iconBtn/IconBtn";
import TestPlanBindCase from "./testPlanBindCase";
import PaginationCommon from "../../common/pagination/Page";
import {useHistory} from "react-router";
import TestPlanENVModal from "./testPlanENVModal";
import TestPlanExecuteTestDrawer from "./testPlanExecuteTestDrawer";

const TestPlanBindCaseList = (props) =>{
    const {testcaseStore} = props
    const {findBindTestCaseList,testPlanDetailList,deleteTestPlanDetail} = testPlanDetailStore;
    const {findTestCaseList} = testcaseStore;
    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: ["testCase","name"],
            key: "name",
            width:"30%",
            render:(text,record)=>(
                <span
                    className={"link-text"}
                    onClick={()=>toDiffCase(record)}
                >
                    {text}
                </span>
            )
        },
        {
            title:`用例类型`,
            dataIndex:["testCase","caseType"],
            key: "type",
            width:"15%",
            render: (text) =>(<div className={"case-table-case-type"}>{showCaseTypeTable(text)}</div>)
        },,
        {
            title: `模块`,
            dataIndex: ["testCase","category","name"],
            key: "category",
            width:"15%",
        },{
            title: `创建人`,
            dataIndex:  ["testCase","createUser"],
            key: "user",
            width:"15%",
            render: (text, record) => (showCreateUser(record.testCase.createUser))
        },
        {
            title: `创建时间`,
            dataIndex:  ["testCase","createTime"],
            key: "createTime",
            width:"15%",
        },
        {
            title: `操作`,
            key: "action",
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteTestPlanDetail(record.id).then(()=> findPage())}
                        okText='确定'
                        cancelText='取消'
                    >
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    let repositoryId = sessionStorage.getItem("repositoryId")
    const testPlanId = sessionStorage.getItem('testPlanId')
    let history = useHistory();
    const [tableLoading,setTableLoading] = useState(true);
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageParam, setPageParam] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

    useEffect(()=>{
        findPage()
    },[pageParam,testPlanId])

    const findPage = () =>{
        const param = {
            testPlanId:testPlanId,
            ...pageParam
        }
        findBindTestCaseList(param).then((res)=>{
            setTotalPage(res.totalPage)
            setTableLoading(false)
        })
    }

    // 分页
    const onTableChange = (current) => {
        setCurrentPage(current)
        const newParams = {
            ...pageParam,
            pageParam: {
                pageSize: pageSize,
                currentPage: current
            },
        }

        setPageParam(newParams)
    }


    const [visible, setVisible] = useState(false);
    const showConnect =()=>{
        findTestCaseList({repositoryId:repositoryId})
        setVisible(true);
    }

    const showCreateUser = (createUser) =>{
        if(createUser&&createUser.nickname){
            return <div className={"ws-user-item"}>
                <Space>
                    <Avatar style={{width:"20px",height:"20px",lineHeight:"20px"}}>{createUser?.nickname[0]}</Avatar>
                    <span >{createUser?.nickname} </span>
                </Space>
            </div>
        }
    }


    //再根据不同的用例类型跳到不同的页面
    const toDiffCase = (record)=>{
        switch (record.testCase.caseType) {
            case "api-unit":
                toDetailAddRouterCommon("apiUnitId",record)
                break;
            case "api-scene":
                toDetailAddRouterCommon("apiSceneId",record)
                break;
            case "api-perform":
                toDetailAddRouterCommon("apiPerfId",record)
                break;

            case "web-scene":
                toDetailAddRouterCommon("webSceneId",record)
                break;
            case "web-perform":
                toDetailAddRouterCommon("webPerfId",record)
                break;

            case "app-scene":
                toDetailAddRouterCommon("appSceneId",record)
                break;

            case "app-perform":
                toDetailAddRouterCommon("appPerfId",record)
                break;
            case "function":
                toDetailAddRouterCommon("functionId",record)
                break
        }
    }

    //跳转路由
    const toDetailAddRouterCommon = (setId,record)=>{
        sessionStorage.setItem(`${setId}`,record.testCase.id);
        history.push(`/plan/plan-to-${record.testCase.caseType}`)
    }



    return(
        <div className={"content-box-center"}>
            <div style={{margin:"10px 0",height:"100%"}}>
            <div className={`${visible?"teston-hide":"teston-show"}`} >
                <div className='title-space-between'>
                    <div className={'test-title'}>
                        <div>测试用例({testPlanDetailList.length})</div>
                    </div>
                    <Space>
                        <TestPlanENVModal {...props}/>
                        <TestPlanExecuteTestDrawer testPlanId={testPlanId} />

                        <IconBtn
                            className="pi-icon-btn-grey"
                            name={"关联用例"}
                            onClick={showConnect}
                        />
                    </Space>

                </div>

                <div className={"table-list-box"}>
                    <Table
                        className="tablelist"
                        columns={columns}
                        dataSource={testPlanDetailList}
                        rowKey={record => record.id}
                        pagination={false}
                        loading={tableLoading}
                        locale={{
                            emptyText: <Empty
                                imageStyle={{height: 120}}
                                description={<span>暂无用例</span>}
                                image={emptyImg}
                            />,
                        }}
                    />
                    <PaginationCommon
                        currentPage={currentPage}
                        totalPage={totalPage}
                        changePage={onTableChange}
                    />
                </div>
            </div>
            <div className={`case-bind_box ${visible?"teston-show":"teston-hide"}`}>
                <TestPlanBindCase
                    setVisible={setVisible}
                    testPlanId={testPlanId}
                />
            </div>
        </div>
        </div>
    )
}

export default inject("testcaseStore")(observer(TestPlanBindCaseList));