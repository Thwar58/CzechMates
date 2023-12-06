import React from 'react';
import * as emailjs from 'emailjs-com';
export default function EmbeddedEmail() {
    function sendEmail(e) {

      const templateParams = {
        name: "some name",
        event: "some event"
     };


        e.preventDefault();
        emailjs.send('service_5lol5zu', 'template_fumphwg',   
        templateParams, 'nCCc6oQB6cd4n0ljl')
            .then((result) => {
              console.log(e.target);
                alert('email sent successfully');
            }, (error) => {
                alert('error sending email');
            });
            //clears the form after sending the email
            e.target.reset();
        }
    return (
        <form onSubmit={sendEmail}>
            <input type='hidden' name='contact_number' />
            <label htmlFor='name'>Name</label>
            <input id='name' type='text' name='from_name'
            placeholder='Your name'/>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' name='reply_to'  
            placeholder='Your email' />
           <label htmlFor='message'>Message</label>
           <textarea id='message' name='message' 
           placeholder="Let's talk about it..."/>
           <button type='submit'>send</button>

       </form>
    );
}