import React, { useState, useEffect } from 'react';
import BioEdit from './BioEdit';
import './Bio.css';
import axios from 'axios';
import { useParams } from 'react-router';

const Bio = () => {
    const { id } = useParams;
    const [bio, setBio] = useState([]);
    const [content, setContent] = useState([]);

    const updateBio = content => {
        axios.put(`api/bio/edit/${id}`, content)
            .then(res => {
                setBio(res.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        const getBio = async () => {
            await axios.get('/api/bio')
                .then(res => {
                    setBio(res.data)
                })
                .catch(err => console.log(err));
        };

        return getBio();

    }, [setBio, content]);


    return (
        <div className='bio_container'>
            <div className='bio_content'>
                <>
                    <BioEdit bio={bio} content={content} setContent={setContent} updateBio={updateBio} id={id} />
                </>

                <div className='bio_content_innards'>
                    {bio.length > 0 ?
                        <>
                            {
                                bio.map((cont, i) => {
                                    return (
                                        <div id={cont.content} key={i}>
                                            <div><p>{cont.content}</p></div>
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