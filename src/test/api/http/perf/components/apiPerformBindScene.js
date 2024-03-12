import React, {useEffect, useState} from "react";
import { observer} from "mobx-react";
import apiPerfStepStore from "../store/apiPerfStepStore";
import ConnectSelectCommon from "../../../../common/ConnectSelectCommon";

const ApiPerformBindScene = (props) =>{
    const {setVisible} = props;

    const {bindApiScene,findApiPerfStepList,findApiPerfStepWillBindCasePage,apiPerfStepWillBindCaseData} = apiPerfStepStore;


    const column =[
        {
            title: '场景名称',
            dataIndex: 'name',
            key: 'name',
            // width: "30%",
        },{
            title: '类型',
            dataIndex:'caseType',
            key: 'testType',
            // width: "30%",
        },{
            title: `创建人`,
            dataIndex: ['createUser', 'nickname'],
            key: "user",
            // width: "20%",
        },
        {
            title: `创建时间`,
            dataIndex: 'createTime',
            key: "createTime",
        }
    ]

    const apiPerfId = sessionStorage.getItem('apiPerfId');
    const repositoryId = sessionStorage.getItem("repositoryId");
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect( ()=>{
        findPage()
    },[])


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

        setVisible(false);
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
            <ConnectSelectCommon
                setVisible={setVisible}
                dataList={apiPerfStepWillBindCaseData?.dataList}
                columns={column}
                onSearch={onSearch}
                onFinish={onFinish}
                totalPage={totalPage}
                currentPage={currentPage}
                onTableChange={onTableChange}
            />
        </>
    )
}

export default observer(ApiPerformBindScene);