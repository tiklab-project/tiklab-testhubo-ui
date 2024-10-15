import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {Axios} from "tiklab-core-ui";
import {Col, Card} from "antd";

const StatisticsCaseTrend = ({repositoryId}) =>{
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    //默认30天
    const [selectedDays, setSelectedDays] = useState(7);

    useEffect(() => {
        const initChart = async () => {
            if (chartRef.current) {
                if (!chartInstanceRef.current) {
                    chartInstanceRef.current = echarts.init(chartRef.current);
                }
                await findStatistics(selectedDays);
            }
        };

        initChart();

        const handleResize = () => chartInstanceRef.current.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose();
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const findStatistics = async (days) => {
        const endTime = new Date();
        endTime.setDate(endTime.getDate()-1)

        let tempStartDate = new Date(endTime);
        tempStartDate.setDate(endTime.getDate() - days);
        let startTime = new Date(tempStartDate); // 更新startTime

        const param = {
            startTime: startTime.toISOString().split('T')[0],
            endTime: endTime.toISOString().split('T')[0],
            repositoryId:repositoryId
        };

        let res = await Axios.post("/statistics/getStatisticsCaseTrend", param);
        let data = res.data;

        if (!data || data.length === 0) {
            console.error("No data returned from API");
            return;
        }

        const dates = data.map(item => item.date);
        const notStarteds = data.map(item => item["notStarted"]);
        const inProgresses = data.map(item => item["inProgress"]);
        const completeds = data.map(item => item["completed"]);

        const option = createOption(
            dates,
            notStarteds,
            inProgresses,
            completeds,
        );

        if (chartInstanceRef.current) {
            chartInstanceRef.current.setOption(option);
        }
    };

    const createOption = (
        dates,
        notStarteds,
        inProgresses,
        completeds,
    ) => ({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['未开始','进行中', '完成'],
        },
        grid: {
            top: '10%',
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dates,
            axisLabel: {
                interval: 'auto'
            }
        },
        yAxis: {
            type: 'value',
        },

        series: [
            {
                name: '未开始',
                type: 'line',
                data: notStarteds
            },
            {
                name: '进行中',
                type: 'line',
                data: inProgresses
            },
            {
                name: '完成',
                type: 'line',
                data: completeds
            },
        ]
    });

    return (
        <Col span={12}>
            <Card title={"用例趋势"} bordered={false} className={"statistic-card-item"}>
                <div
                    ref={chartRef}
                    style={{ width: '100%', height: '400px' }}
                ></div>
            </Card>
        </Col>
    );
}

export default StatisticsCaseTrend