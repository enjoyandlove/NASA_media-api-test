import React, { useState, useReducer, useEffect } from 'react';

const Display = () => {
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    return (
        <>
            <div>
                <label>
                    <input type='checkbox' checked={check1} onChange={() => setCheck1(!check1)}></input>
                    first project
                </label><br />
                <label>
                    <input type='checkbox' checked={check2} onChange={() => setCheck2(!check2)}></input>
                    second project
                </label>
            </div>
        </>
    )
}
export default Display;