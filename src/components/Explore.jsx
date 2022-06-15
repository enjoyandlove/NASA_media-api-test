import React, {useState} from 'react';

const Explore = () => {

    const [title, setTitle] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const search = () => {
        
    }
    return (
        <>
            <input  type = 'text' onChange = {(e) => setTitle(e.target.value)} />
            <input  type = 'number' onChange = {(e) => setStart(e.target.value)} />
            <input  type = 'number' onChange = {(e) => setEnd(e.target.value)} />
            <button onClick={search}>Search</button>
        </>
    )
}
export default Explore;