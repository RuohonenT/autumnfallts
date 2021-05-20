import React, { useState } from 'react';
import BioEdit from './BioEdit';
import './Bio.css';

const Bio = () => {
    const [bio, setBio] = useState([]);
    const [header, setHeader] = useState([]);
    const [content, setContent] = useState([]);


    return (
        <div className='bio_container'>
            <div className='bio_content'>
                <>
                    <BioEdit
                        bio={bio}
                        setBio={setBio}
                        content={content}
                        setContent={setContent}
                        header={header}
                        setHeader={setHeader} />
                </>

                <div className='bio_content_innards'>
                    {bio.length > 0 ?
                        <>
                            {
                                bio.map((bgraph, i) => {
                                    return (
                                        <div id={bgraph.header} key={i}>
                                            <div><h1>{bgraph.header}</h1></div>
                                            <div><p>{bgraph.content}</p></div>
                                        </div>
                                    )
                                })
                            }
                        </>
                        : <div><p>No Bio Found</p></div>}
                </div >
            </div>
        </div>
    )
};

export default Bio;