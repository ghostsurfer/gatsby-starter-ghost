import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../../styles/material-ui'

const ContactForm = () => (

    <form name="Book a Shooting" method="post" data-netlify="true" style={{ 'text-align': `center` }}>
        <ThemeProvider theme={theme}>

            <h2 >Jetzt für ein kostenloses Shooting bewerben!</h2>
            <p>Erzähl mir ein paar Details über dich, damit ich mich auf das Shooting vorbereiten kann</p>

            <div className="grid-form-container">
                <TextField name="Firstname" className="half" label="Vorname" variant="outlined" type="text" required />
                <TextField name="Lastname" className="half" label="Nachname" variant="outlined" type="text" required />
                <TextField name="Email" className="full" label="E-Mail-Adresse" variant="outlined" type="email" required />
                <TextField name="Phone number" name="tel" className="full" label="Telefonnummer" variant="outlined" type="tel" />
                <TextField name="Message" className="full" label="Nachricht" multiline variant="outlined" rows="8" required/>
                {/* Important for Backend*/}  <input type="hidden" name="form-name" value="Book a Shooting" />
                <Button className="submit" type="submit" variant="contained" style={{ 'min-height': ` 55.4px`, 'grid-column': ` 2`, "margin-top": `10px` }} color="primary" >Senden</Button>
            </div>

        </ThemeProvider>
    </form>
)
export default ContactForm
