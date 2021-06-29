import React, { useState, useEffect } from 'react';
import BioEdit from './BioEdit';
import { useAppContext } from '../../Context';
import './Bio.css';
import axios from 'axios';

const Bio = () => {
    const [bio, setBio] = useState([]);
    const [header, setHeader] = useState([]);
    const [content, setContent] = useState([]);
    const { token } = useAppContext();

    useEffect(() => {
        async function getBio() {
            try {
                await axios.get('/api/bio')
                    .then(res => setBio(res.data))
            }
            catch {
                setBio('No biography found.')
            }
        };
        return getBio();

    }, [setBio, content]);


    return (
        <div className='bio_container'>
            <div className='bio_content'>
                {token ?
                    <>
                        <BioEdit
                            bio={bio}
                            setBio={setBio}
                            content={content}
                            setContent={setContent}
                            header={header}
                            setHeader={setHeader} />
                    </>

                    :

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
                            : <div><p>Loading biography...</p></div>}
                    </div >
                }
            </div>
        </div>
    )
};

export default Bio;