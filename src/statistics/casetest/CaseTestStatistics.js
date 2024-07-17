import React, {useEffect, useRef, useState} from "react";
import {CASE_TYPE} from "../../common/dictionary/dictionary";
import * as echarts from 'echarts';
import {Row} from "antd";
import {CaseTestPie, getPieChartOption} from "./CaseTestPie";
import {CaseTestPieDoughnut, getPieDoughnutOption} from "./CaseTestPieDoughnut";
import {Axios} from "thoughtware-core-ui";


const CaseTestStatistics = (props) => {
    const totalRefs = useRef(null);
    const chartRefs = useRef({});
    const [statisticsData, setStatisticsData] = useState();
    let repositoryId = sessionStorage.getItem("repositoryId")


    useEffect(async () => {

        let res = await Axios.post("/statistics/getCaseTestStatistics",{repositoryId:repositoryId})
        let data = res.data
        setStatisticsData(data)
        if (totalRefs.current) {
            const totalInstance = echarts.init(totalRefs.current);
            const option = getPieDoughnutOption(data.status);
            totalInstance.setOption(option);
        }

        Object.keys(CASE_TYPE).forEach((key) => {
            const type = CASE_TYPE[key];
            const item = data.case[type];
            if (!item) return;

            const chartRef = chartRefs.current[type];

            if (chartRef) {
                const chartInstance = echarts.init(chartRef);
                const option = getPieChartOption(item);
                chartInstance.setOption(option);
            }
        });
    }, []);

    return (
        <div className={"content-box-center"}>
            <div style={{fontSize: "16px", fontWeight: "bold", margin: "10px"}}>用例测试统计</div>
            <Row gutter={[20, 20]}>
                <CaseTestPieDoughnut totalRefs={totalRefs} />
                <CaseTestPie data={statisticsData} chartRefs={chartRefs} />
            </Row>
        </div>
    )
}

export default CaseTestStatistics;