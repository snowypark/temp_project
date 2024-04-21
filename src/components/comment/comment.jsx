import React, { useState } from 'react';

function comment(props) {
    const [ saveComment, setSaveComment ] = useState("");
    const handleSaveComment = (e) => {
        setSaveComment(() => e.target.value);
    }
    return (
        <div>
            <input type="text" value={saveComment} onChange={handleSaveComment}/>
        </div>
    );
}

export default comment;