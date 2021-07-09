import React, { useState } from 'react';
import './Contact.css';
const axios = require('axios');

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [info, setInfo] = useState('')

    const handleSubmit = event => {
        event.preventDefault();
        setInfo('Sending...');
        axios({
            method: 'POST',
            url: '/contact',
            data: { name, email, message },
        }).then((res) => {
            if (res.data.status === 'sent') {
                setInfo('Message sent');
                setEmail('');
                setName('');
                setMessage('');
            } else if (res.data.status === 'failed') {
                setInfo('Message not sent');
            }
        });
        console.log(name, email, message);
    }

    return (
        // <div className='contact_container'>

        <div className='contact_content'>

            <div className='contact_innards'><h1>Contact us!</h1>
                <p>Send us a message using the form below.</p></div>

            <div className='contact_form'>
                <form onSubmit={handleSubmit} method='POST'>
                    <div className='contact_row'>
                        <label className='contact_label' htmlFor="name">Name:</label>
                        <input className='contact_input' placeholder='Name' id='name' type='text' value={name} onChange={event => setName(event.target.value)} required />
                    </div>
                    <div className='contact_row'>
                        <label className='contact_label' htmlFor="email">Email:</label>
                        <input className='contact_input' placeholder='Email' id='email' type='email' value={email} onChange={event => setEmail(event.target.value)} required />
                    </div>
                    <div className='contact_row'>
                        <label className='contact_label' htmlFor="message">Message:</label>
                        <textarea className='text-area' placeholder='Write your message here...' id='message' value={message} onChange={event => setMessage(event.target.value)} required />
                    </div>
                    <div className='contact_submit'><button type='submit'>Submit</button></div>
                    <div className='contact_submit'><p>{info}</p></div>

                </form>
            </div>

        </div>

        // </div>
    )
}

export default Contact;