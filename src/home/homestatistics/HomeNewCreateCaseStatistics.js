import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {Axios} from "thoughtware-core-ui";
import {Col, Radio, Card} from "antd";

const HomeNewCreateCaseStatistics = (props) =>{
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [selectedDays, setSelectedDays] = useState(30);

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

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose();
            }
        };
    }, []);

    const findStatistics = async (days) => {
        setSelectedDays(days);

        const endTime = new Date();
        const startTime = new Date();
        startTime.setDate(endTime.getDate() - days + 1);

        const param = {
            startTime: startTime.toISOString().split('T')[0],
            endTime: endTime.toISOString().split('T')[0],
        };

        let res = await Axios.post("/statistics/getNewCreateCaseStatistics", param);
        let data = res.data.fullList;

        if (!data || data.length === 0) {
            console.error("No data returned from API");
            return;
        }

        const dates = data.map(item => item.date);
        const apiUnitCounts = data.map(item => item.API_UNIT);
        const apiSceneCounts = data.map(item => item.API_SCENE);
        const apiPerfCounts = data.map(item => item.API_PERFORM);
        const webSceneCounts = data.map(item => item.WEB_SCENE);
        const appSceneCounts = data.map(item => item.APP_SCENE);
        const functionCounts = data.map(item => item.FUNCTION);

        const option = createOption(
            dates,
            apiUnitCounts,
            apiSceneCounts,
            apiPerfCounts,
            webSceneCounts,
            appSceneCounts,
            functionCounts
        );

        if (chartInstanceRef.current) {
            chartInstanceRef.current.setOption(option);
        }
    };

    const createOption = (
        dates,
        apiUnitCounts,
        apiSceneCounts,
        apiPerfCounts,
        webSceneCounts,
        appSceneCounts,
        functionCounts
    ) => ({

        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['功能','接口单元', '接口场景','接口性能','WEB','APP'],
            // bottom: 0
        },
        grid: {
            top: '15%',
            left: '2%',
            right: '2%',
            bottom: '3%',
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
                name: '功能',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value === 0 ? '' : params.value;
                    }
                },
                data: functionCounts
            },
            {
                name: '接口单元',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value === 0 ? '' : params.value;
                    }
                },
                data: apiUnitCounts
            },
            {
                name: '接口场景',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value === 0 ? '' : params.value;
                    }
                },
                data: apiSceneCounts
            },
            {
                name: '接口性能',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value === 0 ? '' : params.value;
                    }
                },
                data: apiPerfCounts
            },
            {
                name: 'WEB',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value === 0 ? '' : params.value;
                    }
                },
                data: webSceneCounts
            },
            {
                name: 'APP',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value === 0 ? '' : params.value;
                    }
                },
                data: appSceneCounts
            },

        ]
    });

    /**
     * 选择天数
     */
    const handleRadioChange = async (e) => {
        await findStatistics(e.target.value);
    };


    return (
        <Col span={12}>
            <Card title={"最近新增用例"} bordered={false} className={"case-test-item"}>
                {/*<div className={"statistics-select"}>*/}
                {/*    <Radio.Group*/}
                {/*        onChange={handleRadioChange}*/}
                {/*        value={selectedDays}*/}
                {/*        size={"small"}*/}
                {/*    >*/}
                {/*        <Radio.Button value={7}>7天</Radio.Button>*/}
                {/*        <Radio.Button value={30}>30天</Radio.Button>*/}
                {/*        <Radio.Button value={182}>半年</Radio.Button>*/}
                {/*    </Radio.Group>*/}
                {/*</div>*/}
                <div
                    ref={chartRef}
                    className={"home-statistics-new-create-box"}
                ></div>
            </Card>
        </Col>

    );
}

export default HomeNewCreateCaseStatistics