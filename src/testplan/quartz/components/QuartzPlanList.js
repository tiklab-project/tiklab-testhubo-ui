import React, {useEffect, useState} from "react";
import {Empty, Popconfirm, Space, Table, Tag} from "antd";
import emptyImg from "../../../assets/img/empty.png";
import {inject, observer} from "mobx-react";
import quartzPlanStore from "../store/quartzPlanStore";
import QuartzPlanEdit from "./QuartzPlanEdit";
import IconCommon from "../../../common/IconCommon";
import QuartzEnvModal from "./quartzEnvModal";
import PageContent from "../../../common/pageContent/PageContent";


const QuartzPlanList = (props) =>{
    const {testPlanStore,apiEnvStore} =  props;
    const {findQuartzPlanList,deleteQuartzPlan} = quartzPlanStore
    const {findApiEnvList} = apiEnvStore;
    const {findTestPlan} = testPlanStore;

    const columns = [
        {
            title: "执行时间",
            dataIndex: ["quartzTimePlan","showTime"],
            key: "showTime",
            width:"50%",
            ellipsis:true,
        },
        {
            title: "执行方式",
            dataIndex: "exeType",
            key: "exeType",
            width:"25%",
            ellipsis:true,
            render:text => text===1?"单次":"循环"
        },
        {
            title: "状态",
            dataIndex: "state",
            key: "state",
            width:"15%",
            ellipsis:true,
            render:text => text===0
                ? <Tag color="green">未触发</Tag>
                : <Tag color="red">已触发</Tag>
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            render:(_,record) =>(
               <Space>
                   <QuartzPlanEdit
                       type={"edit"}
                       name={"编辑"}
                       testPlanId={testPlanId}
                       quartzPlanId={record.id}
                       findList={findList}
                   />
                   <Popconfirm
                       title="确定删除？"
                       onConfirm={() =>deleteQuartzPlan(record.id).then(()=>findList())}
                       okText='确定'
                       cancelText='取消'
                   >
                       <IconCommon
                           className={"icon-s edit-icon"}
                           icon={"shanchu3"}
                       />
                   </Popconfirm>
               </Space>
            )
        },
    ]

    const [tableLoading,setTableLoading] = useState(true);
    const [list, setList] = useState([]);
    const testPlanId = sessionStorage.getItem('testPlanId')
    const repositoryId = sessionStorage.getItem('repositoryId')

    useEffect(async ()=>{
        await findList()
    },[])

    useEffect(()=>{
        findApiEnvList(repositoryId)
    },[repositoryId])

    useEffect(()=>{
        findTestPlan(testPlanId)
    },[testPlanId])


    const findList = async () =>{
        const param ={
            testPlanId:testPlanId
        }
        let list = await findQuartzPlanList(param)
        setList(list)
        setTableLoading(false)
    }

    return(
        <PageContent>
        <div className={"content-box-center"}>
            <div  className={"header-box-space-between"} >
                <div className={'header-box-title'}>定时任务</div>
                <Space>
                    <QuartzEnvModal />
                    <QuartzPlanEdit
                        type={"add"}
                        name={"添加定时"}
                        testPlanId={testPlanId}
                        findList={findList}
                    />
                </Space>

            </div>

            <div className={"table-list-box"}>
                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={list}
                    rowKey={record => record.id}
                    pagination={false}
                    loading={tableLoading}
                    locale={{
                        emptyText: <Empty
                            imageStyle={{height: 120}}
                            description={<span>暂无定时任务</span>}
                            image={emptyImg}
                        />
                    }}
                />
            </div>
        </div>
        </PageContent>
    )
}

export default inject("apiEnvStore","testPlanStore")(observer(QuartzPlanList))