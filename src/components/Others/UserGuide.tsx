import React from "react";
import { Document, Page } from 'react-pdf'
var pdf = require('../../assets/pdf/user_guide.pdf');

const UserGuide = () => {
    return (
        <div className="w-full h-full">
            <iframe src={pdf} className="w-full overflow-hidden h-screen"></iframe>

        </div>

    )
}

export default UserGuide;