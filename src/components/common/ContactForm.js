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
                <TextField className="half" label="Vorname" variant="outlined" name="firstName" type="text" required />
                <TextField className="half" label="Nachname" variant="outlined" name="lastName" type="text" required />
                <TextField className="full" label="E-Mail-Adresse" variant="outlined" name="email" type="email" required />
                <TextField className="full" label="Telefonnummer" variant="outlined" name="tel" type="tel" />
                <TextField className="full" id="outlined-textarea" label="Nachricht" multiline variant="outlined" rows="8" required/>
                {/* Important for Backend*/}  <input type="hidden" name="form-name" value="Book a Shooting" />
                <Button className="submit" type="submit" variant="contained" style={{ 'min-height': ` 55.4px`, 'grid-column': ` 2`, "margin-top": `10px` }} color="primary" >Senden</Button>
            </div>

        </ThemeProvider>
    </form>
)
export default ContactForm
