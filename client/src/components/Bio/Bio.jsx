import React, { useState, useEffect } from 'react';
import ShowBio from './ShowBio';
import BioEdit from './BioEdit';
import './Bio.css';
import axios from 'axios';

const Bio = () => {
    const [bio, setBio] = useState([]);

    const addBio = async (content) => {
        await axios
            .post('api/bio/add', { content })
            .then(res => {
                setBio([res.data])
            })
            .catch(err => console.log(err));
    };



    return (
        <div className='bio_container'>
            <div className='bio_content'>
                <>
                    <BioEdit bio={bio} setBio={setBio} addBio={addBio} />
                </>
                <>
                    <ShowBio bio={bio} />
                </>
            </div>
        </div>
    )
}

export default Bio;