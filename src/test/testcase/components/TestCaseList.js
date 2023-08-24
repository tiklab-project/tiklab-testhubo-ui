import React, {useEffect, useRef, useState} from "react";
import {Empty, Input, Space,} from "antd";
import TestTypeSelect from "./TestTypeSelect";
import { SearchOutlined} from "@ant-design/icons";
import "./testcaseStyle.scss"
import "./caseContantStyle.scss"
import DropdownAdd from "./DropdownAdd";
import IconCommon from "../../../common/IconCommon";
import {getUser} from "tiklab-core-ui";
import {CASE_TYPE} from "../../../common/DefineVariables";
import {inject, observer} from "mobx-react";
import {
    showCaseTypeIconInList,
    showCaseTypeInList,
} from "../../../common/caseCommon/CaseCommonFn";
import {renderRoutes} from "react-router-config";
import FilterDropDown from "./FilterDropDown";
import emptyImg from "../../../assets/img/empty.png";


const TestCaseList = (props) =>{
    const {testcaseStore,categoryStore,togglePage} = props;
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;
    const {
        findTestCaseList,
        deleteTestCase,
        testType,
        setTestType,
        caseType,
        testCaseRecent
    }=testcaseStore;

    const listRef = useRef();
    const [testcaseList, setTestcaseList] = useState([]);
    const [listSelect, setListSelect] = useState();
    const [selectItem, setSelectItem] = useState(testType?testType:null);
    const [selectCategory, setSelectCategory] = useState(null);
    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(18);
    const [currentPage, setCurrentPage] = useState(1);

    let curPage = localStorage.getItem("TOGGLE_TABLE_RO_LIST_PAGE")
    const repositoryId = sessionStorage.getItem("repositoryId")
    useEffect(async ()=>{
        let dataList = await findPage()
        if(dataList&&dataList.length>0&&curPage==="list"){
            toPage(dataList[0])
        }
    },[])

    useEffect(()=>{
        findCategoryListTreeTable(repositoryId)
    },[])


    /**
     * 查询列表
     * @param params
     * @param isScroll  如果是isScroll有值，表明走的是滚动加载
     * @returns {Promise<*>}
     */
    const findPage = async (params,isScroll) =>{
        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            testType:testType,
            caseType:caseType,
            repositoryId:repositoryId,
            categoryId:selectCategory,
            ...params
        }
        let res = await findTestCaseList(param)

        setTotalRecord(res.totalRecord)

        let list = res?.dataList
        if(isScroll){
            setTestcaseList(prevState => [...prevState,...list])
        }else {
            setTestcaseList(list)
        };

        return list;
    }

    //点击名称 先通过测试类型分类
    const toPage =(record)=>{
        setListSelect(record.id)

        //设置最近打开的接口
        let params = {
            repository:{id:repositoryId},
            user:{id:getUser().userId},
            testCase:{id:record.id},
            // protocolType:item.testCasex.protocolType
        }
        testCaseRecent(params)

        switchCaseType(record)
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
            case CASE_TYPE.WEB_PERFORM:
                toCaseDetail("webPerfId",record)
                break;
            case CASE_TYPE.APP_SCENE:
                toCaseDetail("appSceneId",record)
                break;
            case CASE_TYPE.APP_PERFORM:
                toCaseDetail("appPerfId",record)
                break;
            case CASE_TYPE.FUNCTION:
                toCaseDetail("functionId",record)
                break;
        }
    }

    //跳转路由
    const toCaseDetail = (setId,record)=>{
        sessionStorage.setItem(`${setId}`,record.id);
        props.history.push(`/repository/testcase/${record.caseType}/${record.id}`)
    }

    //模块赛选
    const changeCategory=async (categoryId)=> {
        setSelectCategory(categoryId)

        let param = {categoryId:categoryId,}
        await findPage(param)
    }

    //用例筛选
    const caseSelectFn =async (caseType) =>{
        setCurrentPage(1)
        let param = {caseType:caseType}
        await findPage(param);
    }

    //点击测试类型筛选项查找
    const selectKeyFun =async (item)=>{
        if(!item.key){
            setTestType(null)
            setSelectItem(null)
            let param = {testType:null}
            await findPage(param)
            return;
        }

        let key = item.key
        setSelectItem(key)
        setTestType(key)

        let param = {testType:key}
        await findPage(param)

    }


    /**
     * 滚动加载分页
     */
    const handleScroll = async () => {
        if (listRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = listRef.current;

            if (scrollTop + clientHeight >= scrollHeight-10) {

                if(totalRecord<pageSize) return;
                //如果当前分页大于总数/pageSize,设置当前currentPage为当前
                if(currentPage>=Math.ceil(totalRecord/pageSize)){
                    setCurrentPage(Math.ceil(totalRecord/pageSize));
                    return;
                }
                // 调用加载分页数据的方法
                setCurrentPage(currentPage+1)
                let param = {
                    pageParam: {
                        pageSize: pageSize,
                        currentPage:currentPage+1
                    },
                }

                await findPage(param,"scroll")
            }
        }
    };

    //搜索
    const onSearch = async (e) =>{
        setCurrentPage(1)

        let param = {name: e.target.value}
        await findPage(param)
    }


    /**
     * 列表项展示
     */
    const showListView = (list) =>{
        if(!list||list.length===0){
            return <Empty
                imageStyle={{height: 120}}
                description={<span style={{fontSize: "13px",color: "#a8a8a8"}}>暂无用例</span>}
                image={emptyImg}
            />
        }else {
            return list.map(item=>{
                return(
                    <li
                        key={item.id}
                        className={`case-list_li ${item.id===listSelect?"case-list_li_selected":""}`}
                        onClick={()=>toPage(item)}
                    >
                        <div className={"case-list_li_item"} style={{flex:"1"}}>
                            {showCaseTypeIconInList(item.caseType)}
                        </div>
                        <div className={"case-list_li_item"} style={{flex:"7"}}>
                            {item.name}
                        </div>
                        <div className={"case-list_li_item"} style={{flex:"2"}}>
                            {showCaseTypeInList(item.caseType)}
                        </div>

                    </li>
                )
            })
        }
    }


    return(
       <div style={{
           height:"100%",
           display:"flex",
           overflow:"hidden"
       }}>
           <div style={{
               height:"100%",
               borderRight: "1px solid #e4e4e4"
           }}>
               <div >
                   <div style={{
                       padding: "10px 10px 0",
                       display:"flex",
                       justifyContent:"space-between",
                       alignItems:"center"
                   }}>
                       <div style={{fontSize: "18px",fontWeight: "bold"}}>用例</div>
                       <div style={{
                           display:"flex",
                           gap:"15px",
                           alignItems:"center"
                       }}>
                           <DropdownAdd
                               findPage={findPage}
                               icon={true}
                               {...props}
                           />
                           <IconCommon
                               className={"icon-l "}
                               icon={"qiehuan1"}
                               onClick={()=>togglePage("table")}
                               style={{cursor:"pointer"}}
                           />

                       </div>
                   </div>
                   <div style={{borderBottom:"1px solid #e4e4e4"}}>
                       <TestTypeSelect
                           selectItem={selectItem}
                           selectKeyFun={selectKeyFun}
                       />
                   </div>
                   <Space style={{margin:"10px"}} size={"large"}>

                       <Input
                           style={{
                               border:"1px solid #e4e4e4",
                               borderRadius:"5px",
                               height:36
                           }}
                           onPressEnter={onSearch}
                           className='search-input-common'
                           prefix={<SearchOutlined />}
                           placeholder={`搜索用例`}
                       />

                       <FilterDropDown
                           changeCategory={changeCategory}
                           categoryTableList={categoryTableList}
                           caseSelectFn={caseSelectFn}
                           selectItem={selectItem}
                       />
                   </Space>

               </div>
               <div style={{height: "100%"}}>
                   <ul className={"case-list_ul"} ref={listRef} onScroll={handleScroll}>
                       {
                           showListView(testcaseList)
                       }
                   </ul>
                   <div className={"case-list_bottom"}>
                       <span style={{fontSize: "12px", color: "#989898"}}>
                           已加载{testcaseList.length}个，共<span>{totalRecord}</span>个
                       </span>
                   </div>
               </div>
           </div>
           <div style={{
               flex:"1",
               overflow: "auto"
           }}
           >
               {
                   testcaseList&&testcaseList.length>0
                       ?renderRoutes(props.route.routes)
                       :<div style={{height:"100%",display:"flex",alignItems:"center",justifyContent: "center"}}>
                           <Empty
                               imageStyle={{height: 120}}
                               description={
                                   <span style={{fontSize: "13px",color: "#a8a8a8"}}>
                                       选择用例
                                   </span>
                               }
                               image={emptyImg}
                           />
                       </div>
               }
           </div>
       </div>
    )
}
export default inject("testcaseStore","categoryStore")(observer(TestCaseList));