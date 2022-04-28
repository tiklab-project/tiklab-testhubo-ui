const headerParamDictionary = [
    'Accept',
    'Accept-Charset',
    'Accept-Encoding',
    'Accept-Language',
    'Authorization',
    'Connection',
    'Content-Length',
    'Cookie',
    'From',
    'Host',
    'If-Modified-Since',
    'Pragma',
    'Referer',
    'User-Agent',
];

const mockValueDictionary = [
    '@id',
    '@url',
    '@guid',
    '@integer',
    '@word',
    '@first',
    '@last',
    '@name',
    '@cfirst',
    '@clast',
    '@domain',
    '@email',
    '@ip',
    '@boolean',
    '@date',
    '@time',
    '@color',
];

const dataTypeDictionary = [
    'string',
    'int',
    'float',
    'double',
    'object',
    'boolean',
    'Number',
    'byte',
    'short',
    'long',
    'char'
]

const week = [
    {label:'星期日',value:1},
    {label:'星期一',value:2},
    {label:'星期二',value:3},
    {label:'星期三',value:4},
    {label:'星期四',value:5},
    {label:'星期五',value:6},
    {label:'星期六',value:7},
];
const day = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00',
    '12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'
]

//功能测试结果

const functionalTestResult =[
    '未执行',
    '成功',
    '未通过',
    '待审核',
    '阻塞'
]

export {
    headerParamDictionary,
    mockValueDictionary,
    dataTypeDictionary,
    week,
    day,
    functionalTestResult
}