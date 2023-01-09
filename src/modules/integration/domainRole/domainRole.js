import React from "react";
import { DomainUserList  } from 'tiklab-user-ui';

const DomainRole = props => {
    const repositoryId = sessionStorage.getItem('repositoryId')

    return (
            <DomainUserList
                {...props} 
                domainId = { repositoryId }
                bgroup={"postin"}
            />
    )
}

export default DomainRole
