import React, { useState } from 'react';
import ShowBio from './ShowBio';
import BioEdit from './BioEdit';
import './Bio.css';

const Bio = () => {
    const [bio, setBio] = useState();

    return (
        <div className='bio_container'>
            <div className='bio_content'>
                <>
                    <ShowBio bio={bio} />
                </>
                <>
                    <BioEdit setBio={setBio} />
                </>
            </div>
        </div>
    )
}

export default Bio;