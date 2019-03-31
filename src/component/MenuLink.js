import React from 'react';
import {Route, Link} from 'lib/react-router-dom'

export default({to, children}) => {
    return (
        <Route
            path={ to }
            children={ props => {
                console.table(props);
                return (
                    <li className={props.match ? "active": ""}>
                        <Link to={ to } className="nav-link">{children}</Link>
                    </li>
                )
            }}
        />
    )
}