import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Avatar, Empty, Input, Popconfirm, Space, Table} from "antd";
import IconCommon from "../../common/IconCommon";
import { showCaseTypeTable} from "../../common/caseCommon/CaseCommonFn";
import emptyImg from "../../assets/img/empty.png";
import testPlanDetailStore from "../store/testPlanDetailStore";
import IconBtn from "../../common/iconBtn/IconBtn";
import TestPlanBindCase from "./testPlanBindCase";
import PaginationCommon from "../../common/pagination/Page";
import {useHistory} from "react-router";
import TestPlanENVModal from "./testPlanENVModal";
import TestPlanExecuteTestDrawer from "./testPlanExecuteTestDrawer";
import {SearchOutlined} from "@ant-design/icons";

const TestPlanBindCaseList = (props) =>{
    const { testPlanStore } = props;
    const {findTestPlan} = testPlanStore;
    const {findBindTestCaseList,testPlanDetailList,deleteTestPlanDetail} = testPlanDetailStore;

    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
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
            dataIndex:"caseType",
            key: "type",
            width:"15%",
            render: (text) =>(<div className={"case-table-case-type"}>{showCaseTypeTable(text)}</div>)
        },,
        {
            title: `模块`,
            dataIndex: ["category","name"],
            key: "category",
            width:"15%",
        },{
            title: `创建人`,
            dataIndex:  ["createUser"],
            key: "user",
            width:"15%",
            render: (text, record) => (showCreateUser(record.createUser))
        },
        {
            title: `创建时间`,
            dataIndex:  ["createTime"],
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

    const testPlanId = sessionStorage.getItem('testPlanId')
    let history = useHistory();
    const [tableLoading,setTableLoading] = useState(true);
    const [name, setName] = useState();
    const [totalPage, setTotalPage] = useState();
    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(20);
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

    useEffect(()=>{
        findTestPlan(testPlanId).then((res)=>{
            setName(res.name)
        })
    },[])


    const findPage = (params) =>{
        const param = {
            testPlanId:testPlanId,
            ...pageParam,
            ...params
        }
        findBindTestCaseList(param).then((res)=>{
            setTotalPage(res.totalPage)
            setTotalRecord(res.totalRecord)
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
        switch (record.caseType) {
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
        sessionStorage.setItem(`${setId}`,record.id);
        history.push(`/plan/plan-to-${record.caseType}`)
    }


    //搜索
    const onSearch = (e) =>{
        setCurrentPage(1)
        let param = {name: e.target.value}

        findPage(param)
    }

    return(
        <div className={"content-box-center"}>
            <div className='header-box-space-between'>
                <div className={'header-box-title'}>测试用例</div>
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
            <div style={{margin:"10px 0",height:"100%"}}>
                <div className={`${visible?"teston-hide":"teston-show"}`} >
                    <div className='display-flex-between'>
                        <span>{totalRecord}个用例</span>

                        <Input
                            placeholder={`搜索用例`}
                            onPressEnter={onSearch}
                            className='search-input-common'
                            prefix={<SearchOutlined />}
                        />
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
                        findBindCasePage={findPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("testcaseStore","testPlanStore")(observer(TestPlanBindCaseList));