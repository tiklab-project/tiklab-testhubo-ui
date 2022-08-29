import React from "react";
import BreadcrumbEx from "../../common/breadcrumbEx";
import RepositoryRecentHome from "./repositoryRecentHome";

const RepositoryRecent = (props) =>{



    return(
        <div style={{"padding":"5px 0"}}>
            {/*<BreadcrumbEx*/}
            {/*    list={[*/}
            {/*        "仓库",*/}
            {/*        "最近访问"*/}
            {/*    ]}*/}
            {/*/>*/}
            <RepositoryRecentHome {...props}/>
        </div>
    )
}

export default RepositoryRecent;