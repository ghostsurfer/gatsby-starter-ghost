import React from 'react'

import { Layout } from '../components/common'

const ContactPage = () => (
    <Layout>
        <form name="contact" method="POST" data-netlify="true">
            <p>
                <label>Your Name: <input type="text" name="name" /></label>
            </p>
            <p>
                <label>Your Email: <input type="email" name="email" /></label>
            </p>
            <p>
                <label>Art des Shootings: <select name="role[]">
                    <option value="tfp">TFP</option>
                    <option value="pay">ich möchte bezahlen</option>
                </select></label>
            </p>
            <p>
                <label>Message: <textarea name="message"></textarea></label>
            </p>
            <p>
                <button type="submit">Send</button>
            </p>
        </form>
    </Layout>
)

export default ContactPage
