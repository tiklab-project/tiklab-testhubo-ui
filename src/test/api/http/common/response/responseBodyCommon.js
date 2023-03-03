import React, {useEffect, useState} from "react";
import "./testResponseStyle.scss"
import ReactMonacoEditor from "../../../../../common/ReactMonacoEditor";

const ResponseBodyCommon = (props) => {
    const {responseBodyData,mediaType,height} = props;


    const [language, setLanguage] = useState("text");
    const [dataSource, setDataSource] = useState("");



    useEffect(()=>{
        let data = formatData(responseBodyData)
        setDataSource(data)
    },[responseBodyData])

    let formatData =(data)=>{
        //空值
        if(!data) return

        let format="";

        try{
            let jsonObj = JSON.parse(data)

            setLanguage("json")
            format= JSON.stringify(jsonObj,null,4)
        }catch {

            setLanguage("text")
            format = data
        }

        return format;
    }

    // let  handleString=(str)=> {
    //
    //
    //     if (str.startsWith("<")&& str.endsWith(">")) {
    //
    //         setLanguage("html")
    //         return str;
    //     }
    //     else if (str.startsWith("{")&& str.endsWith("}")) {
    //         setLanguage("json")
    //         return JSON.parse(str);
    //     }
    //     else {
    //         setLanguage("text")
    //         return str;
    //     }
    // }

    return(
        <div className={"codemirror-box"}>

            <ReactMonacoEditor
                value={dataSource}
                language={language}
                height={height?height:"400px"}
                width={"100%"}
                readOnly={true}
            />
        </div>
    )

}

export default ResponseBodyCommon;