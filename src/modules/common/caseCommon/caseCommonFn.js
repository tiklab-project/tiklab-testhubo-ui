//表格中测试类型展示
export const showTestTypeView = (type)=>{
    switch (type) {
        case "api":
            return "接口"
        case "web":
            return "WEB"
        case "app":
            return "APP"
        case "func":
            return "功能"
    }
}

//表格中用例类型展示
export const showCaseTypeView = (type)=>{
    switch (type) {
        case "unit":
            return "单元"
        case "scene":
            return "场景"
        case "perform":
            return "性能"
    }
}

