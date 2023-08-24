import React, {useEffect, useState} from "react";
import TestCaseList from "./TestCaseList";
import "./testcaseStyle.scss"
import "./caseContantStyle.scss"
import TestCaseTable from "./TestCaseTable";
import {useHistory} from "react-router";

const TestCaseContent = (props) =>{

    const [isTableOrList, setIsTableOrList] = useState();

    let history = useHistory()
    const toggleTableOrListPage = (type)=>{
        history.push("/repository/testcase")
        localStorage.setItem("TOGGLE_TABLE_RO_LIST_PAGE",type)
        setIsTableOrList(type)
    }

    let curPage = localStorage.getItem("TOGGLE_TABLE_RO_LIST_PAGE")
    useEffect(()=>{
        setIsTableOrList(curPage||"list")

    },[isTableOrList])

    const showPage = (type) =>{
        if(type==="list"){
            return (
                <TestCaseList
                    togglePage={toggleTableOrListPage}
                    {...props}
                />
            )
        }else {
            return (
                <TestCaseTable
                    togglePage={toggleTableOrListPage}
                    {...props}
                />
            )
        }
    }

    return(
        <>
            {showPage(isTableOrList)}
        </>
    )
}
export default TestCaseContent