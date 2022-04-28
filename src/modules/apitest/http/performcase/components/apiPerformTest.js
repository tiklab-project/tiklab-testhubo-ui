import React, {useEffect, useState} from "react";
import {Button} from "antd";

const ApiPerformTest = (props) =>{


    useEffect(()=>{

    },[])

    const toHistory = () =>{
        props.history.push("/repositorypage/apitest/perform-instance")
    }

    const onTest = () =>{

    }

    return(
        <>
            <div className={"api-perf-test-header-box"}>
                <a onClick={toHistory}>测试历史</a>
                <Button onClick={onTest}>执行测试</Button>
            </div>



        </>
    )
}

export default ApiPerformTest;