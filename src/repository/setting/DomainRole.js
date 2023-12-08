import React from "react";
import { DomainUser  } from 'thoughtware-user-ui';

/**
 * 包装成员
 */
const DomainRole = props => {
    const repositoryId = sessionStorage.getItem('repositoryId')

    return (
            <DomainUser
                {...props} 
                domainId = {repositoryId}
                bgroup={"teston"}
            />
    )
}

export default DomainRole
