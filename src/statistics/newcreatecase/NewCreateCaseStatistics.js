import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {Axios} from "thoughtware-core-ui";
import {DatePicker, Radio, Space, Table} from "antd";
import moment from 'moment';
const { RangePicker } = DatePicker;

const NewCreateCaseStatistics = () =>{
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [selectedDays, setSelectedDays] = useState(30);
    const [tableList, setTableList] = useState([]);

    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(() => {
        chartInstanceRef.current = echarts.init(chartRef.current);
        findStatistics(selectedDays);

        window.addEventListener('resize', handleResize);
        return () => {
            chartInstanceRef.current.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.resize();
        }
    };
    /**
     * 查询统计数据
     */
    const findStatistics = async (days) => {
        setSelectedDays(days);

        const endTime = new Date();
        const startTime = new Date();
        startTime.setDate(endTime.getDate() - days + 1);

        const param = {
            startTime: startTime.toISOString().split('T')[0],
            endTime: endTime.toISOString().split('T')[0],
            repositoryId:repositoryId
        };

        let res = await Axios.post("/statistics/getNewCreateCaseStatistics", param);
        setTableList(res.data.hasDataList)
        let data = res.data.fullList;


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
        chartInstanceRef.current.setOption(option);
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
        title: {
            text: '每天新增用例数',
            textStyle: {
                fontSize: 13,
            },
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['功能用例','接口单元', '接口场景','接口性能','WEB场景','APP场景']
        },
        grid: {
            top: '15%',
            left: '2%',
            right: '2%',
            bottom: '2%',
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
                name: '功能用例',
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
                name: 'WEB场景',
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
                name: 'APP场景',
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

    /**
     * 自定义选择日期
     */
    const handleRangeChange = async (dates) => {
        if (dates) {
            const startTime = dates[0].toDate();
            const endTime = dates[1].toDate();

            const days = moment(endTime).diff(moment(startTime), 'days') + 1;

            await findStatistics(days);
        }
    };


    return (
        <div className={"content-box-center"}>
            <div style={{fontSize:"16px",fontWeight:"bold",margin:"10px"}}>新增用例统计</div>
            <div className={"statistics-select"}>
                <Space>
                    <div>天数 : </div>
                    <Radio.Group
                        onChange={handleRadioChange}
                        value={selectedDays}
                    >
                        <Radio.Button value={7}>7天</Radio.Button>
                        <Radio.Button value={30}>30天</Radio.Button>
                        <Radio.Button value={182}>半年</Radio.Button>
                    </Radio.Group>
                </Space>
                <Space>
                    <div>自定义 : </div>
                    <RangePicker onChange={handleRangeChange} defaultValue={[moment().subtract(30, 'days'), moment()]} />
                </Space>
            </div>

            <div
                ref={chartRef}
                className={"statistics-new-create-box"}
            ></div>

            <div className={"table-list-box"} style={{margin:"20px 0",padding:"20px 0"}}>
                <Table
                    columns={
                        [
                            {
                                title:`时间`,
                                dataIndex: 'date',
                                key: "date",
                            },
                            {
                                title: `功能用例`,
                                dataIndex: "FUNCTION",
                                key: "FUNCTION",
                                align:"center"
                            },
                            {
                                title: `接口单元`,
                                dataIndex: "API_UNIT",
                                key: "API_UNIT",
                                align:"center"
                            },
                            {
                                title: `接口场景`,
                                dataIndex: "API_SCENE",
                                key: "API_SCENE",
                                align:"center"
                            },
                            {
                                title: `接口性能`,
                                dataIndex: "API_PERFORM",
                                key: "API_PERFORM",
                                align:"center"
                            },
                            {
                                title: `WEB场景`,
                                dataIndex: "WEB_SCENE",
                                key: "WEB_SCENE",
                                align:"center"
                            },
                            {
                                title: `APP场景`,
                                dataIndex: "APP_SCENE",
                                key: "APP_SCENE",
                                align:"center"
                            }
                        ]
                    }
                    dataSource={tableList}
                    rowKey={(record, index) => index}
                    pagination={false}
                />
            </div>

        </div>

    );
}

export default NewCreateCaseStatistics