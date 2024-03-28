import React, {useEffect, useRef, useState} from "react";
import {showCaseTypeInList} from "../../../common/caseCommon/CaseCommonFn";
import {inject, observer} from "mobx-react";
import PaginationCommon from "../../../common/pagination/Page";
import {getUser} from "thoughtware-core-ui";
import {useHistory} from "react-router";
import IconCommon from "../../../common/IconCommon";
import {Spin} from "antd";
import {CASE_TYPE} from "../../../common/dictionary/dictionary";

const ToggleCase = (props) =>{
    const {testcaseStore,caseId} = props
    const [visible, setVisible] = useState(false);
    const {
        findTestCaseList,
        testcaseList,
        testCaseRecent
    }=testcaseStore;

    const [caseList, setCaseList] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    let repositoryId = sessionStorage.getItem("repositoryId")
    let history = useHistory()
    const caseToggleRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            // 检查点击的目标是否在下拉框内
            if (caseToggleRef.current && !caseToggleRef.current.contains(event.target)) {
                setVisible(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []); // 空数组表示仅在组件挂载和卸载时执行


    const toggle = () =>{
        setVisible(!visible)
        findPage()

    }

    const findPage = (params) =>{
        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            repositoryId:repositoryId,
            ...params
        }
        findTestCaseList(param).then((res)=>{
            setCaseList(res.dataList)
            setTotalPage(res.totalPage);
        })
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

    //再根据不同的用例类型跳到不同的页面
    const switchCaseType = (record)=>{
        switch (record.caseType) {
            case CASE_TYPE.API_UNIT:
                toCaseDetail("apiUnitId",record)
                break;
            case CASE_TYPE.API_SCENE:
                toCaseDetail("apiSceneId",record)
                break;
            case CASE_TYPE.API_PERFORM:
                toCaseDetail("apiPerfId",record)
                break;
            case CASE_TYPE.WEB_SCENE:
                toCaseDetail("webSceneId",record)
                break;

            case CASE_TYPE.APP_SCENE:
                toCaseDetail("appSceneId",record)
                break;

            case CASE_TYPE.FUNCTION:
                toCaseDetail("functionId",record)
                break;
        }
    }

    //跳转路由
    const toCaseDetail = (setId,record)=>{

        //最近访问
        let params = {
            repository:{id:repositoryId},
            user:{id:getUser().userId},
            testCase:{id:record.id},
        }
        testCaseRecent(params)

        sessionStorage.setItem(`${setId}`,record.id);
        history.push(`/repository/${record.caseType}/${record.id}`)
        setVisible(!visible)
    }



    return(
        <div className={"case-toggle"} ref={caseToggleRef}>
            <div
                onClick={toggle}
                style={{cursor:"pointer",margin:"5px 0 0"}}
            >
                <IconCommon
                    className={"icon-s"}
                    icon={"xiala"}
                />
            </div>

            <div className={`case-toggle-title ${visible === false ? 'teston-hide' : 'teston-show'}`}>
                {
                    caseList&&caseList.map((item,index)=>{
                        return(
                            <div
                                key={item.id}
                                className={`
                            display-flex-between 
                            toggle-case-item 
                            ${caseId=== item.id ? 'toggle-case-item-selected' : ''}
                            `}
                                onClick={()=>switchCaseType(item)}
                            >
                                <span className={"text-ellipsis"}>{item.name}</span>
                                {
                                    showCaseTypeInList(item.caseType)
                                }
                            </div>
                        )
                    })
                }
                <PaginationCommon
                    currentPage={currentPage}
                    totalPage={totalPage}
                    changePage={onTableChange}
                />
            </div>


        </div>
    )
}

export default inject("testcaseStore")(observer(ToggleCase));