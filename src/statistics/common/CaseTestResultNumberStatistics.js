import React, {useEffect, useRef, useState} from "react";
import {Row, Col, Card, Radio, Space, DatePicker} from "antd";
import {Axios} from "thoughtware-core-ui";
import * as echarts from "echarts";
import moment from "moment";
const { RangePicker } = DatePicker;
import "./statisticsStyle.scss"

const createBarOption = ({total,pass,fail,error})=>({
    grid: {
        top: '2%',
        left: '2%',
        right: '2%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['总数', '成功', '失败', '异常']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '统计',
            type: 'bar',
            label: {
                show: true,
                position: 'top'
            },
            data: [total, pass, fail, error]
        }
    ]
});

const createPieOption = ({ total = 0, pass = 0, fail = 0, error = 0 }) => ({
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['成功', '失败']
    },
    series: [
        {
            type: 'pie',
            radius: '50%',
            label: {
                show: true,
                position: 'outside', // 文字显示在外部
                formatter: ({ name, percent }) => {
                    // 确保显示0%而不是undefined%
                    return `${(percent || 0).toFixed(2)}%`;
                },
                textStyle: {
                    fontSize: 14,
                    color: '#000' // 黑色字体，更适合外部显示
                }
            },
            labelLine: {
                show: true, // 显示连接线
                lineStyle: {
                    color: '#333' // 连接线颜色
                }
            },
            data: [
                {
                    value: pass,
                    name: '成功',
                    itemStyle: {
                        color: '#73d273' // 浅绿色
                    }
                },
                {
                    value: fail + error,
                    name: '失败',
                    itemStyle: {
                        color: '#ee9478' // 橙黄色
                    }
                }
            ]
        }
    ]
});

const CaseTestResultNumberStatistics = ({repositoryId}) =>{

    const chartBarRef = useRef(null);
    const chartBarInstanceRef = useRef(null);
    const chartPieRef = useRef(null);
    const chartPieInstanceRef = useRef(null);

    const [selectedDays, setSelectedDays] = useState(1);
    const [dataInfo, setDataInfo] = useState();

    const getStatisticsData = async (days) => {
        setSelectedDays(days)

        let startTime = new Date();
        let endTime = new Date();
        endTime.setDate(endTime.getDate()+1)

        startTime.setDate(endTime.getDate() - days)
        const param = {
            startTime: startTime.toISOString().split('T')[0],
            endTime: endTime.toISOString().split('T')[0],
            repositoryId:repositoryId
        };

        let res = await Axios.post("/statistics/getCaseTestResultNumberStatistics", param);
        setDataInfo(res.data);

        let barOption = createBarOption(res.data.total)
        chartBarInstanceRef.current.setOption(barOption)

        let pieOption = createPieOption(res.data.total)
        chartPieInstanceRef.current.setOption(pieOption)

        return res.data
    };

    useEffect(async () => {
        chartBarInstanceRef.current = echarts.init(chartBarRef.current);
        chartPieInstanceRef.current = echarts.init(chartPieRef.current);

        await getStatisticsData(selectedDays);

        const handleResize = () => {
            chartBarInstanceRef.current.resize();
            chartPieInstanceRef.current.resize();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            chartBarInstanceRef.current.dispose();
            chartPieInstanceRef.current.dispose()
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    const showItemBox = () => {
        const dataItem = [
            {
                title: "总数",
                value: dataInfo?.total?.total,
                color: "#919191"
            },
            {
                title: "成功",
                value: dataInfo?.total?.pass,
                color: "#a1ca7d"
            },
            {
                title: "失败",
                value: dataInfo?.total?.fail,
                color: "#efcc6b"
            },
            {
                title: "异常",
                value: dataInfo?.total?.error,
                color: "#e36363"
            }
        ];

        return dataItem.map((item, index) => (
            <Col
                key={index}
                span={6}
            >
                <div
                    style={{
                        textAlign:"center",
                        height: "80px",
                        background:"#f8f8f8",
                        padding: "13px",
                        margin: "15px 0"
                    }}
                >
                    <div>
                        {item.title}
                    </div>
                    <div style={{fontSize:"18px",fontWeight:"bold",color:`${item.color}`}}>
                        {item.value}
                    </div>
                </div>

            </Col>
        ));
    };


    /**
     * 选择天数
     */
    const handleRadioChange = async (e) => {

        await getStatisticsData(e.target.value);
    };

    /**
     * 自定义选择日期
     */
    const handleRangeChange = async (dates) => {
        if (dates) {
            const startTime = dates[0].toDate();
            const endTime = dates[1].toDate();

            const days = moment(endTime).diff(moment(startTime), 'days') + 1;

            await getStatisticsData(days);
        }
    };


    return (
        <>
            <Row gutter={10}>
                <Col span={24} >
                    <Space>
                        <Radio.Group
                            onChange={handleRadioChange}
                            value={selectedDays}
                        >
                            <Radio.Button value={1}>今天</Radio.Button>
                            <Radio.Button value={7}>7天</Radio.Button>
                            <Radio.Button value={30}>30天</Radio.Button>
                        </Radio.Group>

                        <RangePicker onChange={handleRangeChange} defaultValue={[moment().subtract(7, 'days'), moment()]} />
                    </Space>
                </Col>
            </Row>
            <Row gutter={20}>
                {showItemBox()}
            </Row>
            <Row gutter={20}>
                <Col span={12}>
                    <Card title={"测试结果"} bordered={false} className={"statistic-card-item"}>
                        <div
                            ref={chartBarRef}
                            style={{ width: '100%', height: '400px' }}
                        ></div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={"成功率/失败率"} bordered={false} className={"statistic-card-item"}>
                        <div
                            ref={chartPieRef}
                            style={{ width: '100%', height: '400px' }}
                        ></div>
                    </Card>
                </Col>
            </Row>
        </>

    );
}

export default CaseTestResultNumberStatistics;