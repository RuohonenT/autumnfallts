import React, { useState } from 'react';
import ShowBio from './ShowBio';
import BioEdit from './BioEdit';
import './Bio.css';
import axios from 'axios';

const Bio = () => {
    const [bio, setBio] = useState([]);

    const deleteBio = async (content) => {
        const delBio = bio.filter(txt => txt.content !== content);
        await axios
            .delete('api/bio/delete', { data: { delBio } })
            .catch(err => console.log('deleteBio', err))
    };

    return (
        <div className='bio_container'>
            <div className='bio_content'>
                <>
                    <ShowBio bio={bio} />
                </>
                <>
                    <BioEdit bio={bio} setBio={setBio} delete={deleteBio} />
                </>
            </div>
        </div>
    )
}

export default Bio;