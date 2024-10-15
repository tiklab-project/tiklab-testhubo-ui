import React, {useEffect, useRef, useState} from "react";
import {CASE_TYPE} from "../../common/dictionary/dictionary";
import * as echarts from 'echarts';
import {Row} from "antd";
import {CaseTestPie, getPieChartOption} from "./CaseTestPie";
import {CaseTestPieDoughnut, getPieDoughnutOption} from "./CaseTestPieDoughnut";
import {Axios} from "tiklab-core-ui";


const CaseTestStatistics = (props) => {
    const totalRefs = useRef(null);
    const chartRefs = useRef({});
    const chartInstancesRef = useRef({});
    const [statisticsData, setStatisticsData] = useState();
    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(async () => {
        fetchData();

        // 添加 resize 事件监听器
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            Object.values(chartInstancesRef.current).forEach(instance => {
                if (instance) {
                    instance.dispose();
                }
            });
        };
    }, []);

    const fetchData = async () => {
        let res = await Axios.post("/statistics/getCaseTestStatistics", {repositoryId: repositoryId});
        let data = res.data;
        setStatisticsData(data);

        if (totalRefs.current) {
            const totalInstance = echarts.init(totalRefs.current);
            const option = getPieDoughnutOption(data.status);
            totalInstance.setOption(option);
            chartInstancesRef.current.total = totalInstance;
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
                chartInstancesRef.current[type] = chartInstance;
            }
        });
    };

    const handleResize = () => {
        if (chartInstancesRef.current.total) {
            chartInstancesRef.current.total.resize();
        }
        Object.values(chartInstancesRef.current).forEach(instance => {
            if (instance && instance !== chartInstancesRef.current.total) {
                instance.resize();
            }
        });
    };

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