import React from 'react';
import * as emailjs from 'emailjs-com';
export default function EmbeddedEmail() {
    function sendEmail(e) {

    const actualParams = {
        member: "member name",
        code: "some code",
        sender: "whoever send the invite",
        email: "member email"
    };

      const templateParams = {
        name: "some name",
        event: "some event"
     };


      
        emailjs.send('service_5lol5zu', 'template_fumphwg',   
        templateParams, 'nCCc6oQB6cd4n0ljl')
            .then((result) => {
              console.log(e.target);
                alert('email sent successfully');
            }, (error) => {
                alert('error sending email');
            });
         
        }
}