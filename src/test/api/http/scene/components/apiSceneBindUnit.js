import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import apiSceneStepStore from "../store/apiSceneStepStore";
import ConnectSelectCommon from "../../../../common/ConnectSelectCommon";

const ApiSceneBindUnit =(props) =>{
    const {setVisible,findList,apiSceneId,apiSceneStore} = props;
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


    useEffect( ()=>{
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
    },[])

    // 提交
    const onFinish = async (id) => {
        await bindApiUnit([id],apiSceneId)
        await findList()
        await findPage()
        await findApiScene(apiSceneId)
        setVisible(false);
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
            <ConnectSelectCommon
                setVisible={setVisible}
                dataList={apiSceneStepWillBindCaseData?.dataList}
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

export default inject("apiUnitStore","apiSceneStore")(observer(ApiSceneBindUnit));