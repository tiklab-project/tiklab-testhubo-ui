import React from "react";
import {CASE_TYPE} from "../../common/dictionary/dictionary";
import {Card, Col} from "antd";

export const getPieChartOption = (results) => {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: '0%',
            left: 'center'
        },
        series: [
            {
                name: '测试结果',
                type: 'pie',
                radius: '50%',
                data: [
                    {
                        value: results.pass,
                        name: '通过',
                        itemStyle: { color: '#94e37b' }
                    },
                    {
                        value: results.fail,
                        name: '失败',
                        itemStyle: { color: '#e07777' }
                    },
                    {
                        value: results.notTested,
                        name: '未测试',
                        itemStyle: { color: '#dcd6d6' }
                    }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    normal: {
                        formatter: '{c}',
                        position: 'outside'
                    }
                }
            }
        ]
    };
};

export const CaseTestPie = ({data,chartRefs}) =>{

    const showName = (type) =>{
        switch (type) {
            case CASE_TYPE.API_UNIT:
                return "接口单元";
            case CASE_TYPE.API_SCENE:
                return "接口场景";
            case CASE_TYPE.API_PERFORM:
                return "接口性能";
            case CASE_TYPE.WEB_SCENE:
                return "WEB场景";
            case CASE_TYPE.APP_SCENE:
                return "APP场景";
        }
    }

    const renderStatisticsView = (data) => {
        return Object.keys(CASE_TYPE).map((key) => {
            const type = CASE_TYPE[key];

            if(!data)return;
            const item = data.case[type];
            if(!item)return;

            return (
                <Col span={12} key={type}>
                    <Card title={showName(type)} bordered={false} className={"case-test-item"}>
                        <div
                            ref={(el) => (chartRefs.current[type] = el)}
                            style={{ width: '100%', height: '200px' }}
                        ></div>
                    </Card>
                </Col>
            );
        });
    };


    return(
        <>
            {renderStatisticsView(data)}
        </>
    )
}
