import React from 'react'
import {Link} from '../router'

export const Footer = () => {
    return (
        <div className="Footer">
            <Link to='/'>All</Link>
            <Link to='/Active'>Active</Link>
            <Link to='/Complete'>Complete</Link>
        </div>
//to attr => passing some info to the Link
//to tell that hyperlink where to go
    )
}