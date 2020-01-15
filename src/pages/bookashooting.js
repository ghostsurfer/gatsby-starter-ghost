import React from 'react'
import { Layout } from '../components/common'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../styles/material-ui'

const BookShooting = () => (
    <Layout>
        <div className="container">
            <article className="content" style={{ textAlign: `center` }}>
                <h1 className="content-title">Book a Shooting</h1>
                <section className="content-body">

                    <form name="TFP-Shooting" method="post" data-netlify="true" data-netlify-honeypot="important-field">

                        <ThemeProvider theme={theme}>

                            <h2>Jetzt für ein kostenloses Shooting bewerben!</h2>
                            <p>Erzähl mir ein paar Details über dich, damit ich mich auf das Shooting vorbereiten kann</p>
                            <div className="grid-form-container">
                                <TextField className="half" label="Vorname" variant="outlined" name="firstName" type="text" required />
                                <TextField className="half" label="Nachname" variant="outlined" name="lastName" type="text" required />
                                <TextField className="full" label="E-Mail-Adresse" variant="outlined" name="email" type="email" required />
                                <TextField className="full" label="Telefonnummer" variant="outlined" name="tel" type="tel" />
                                <TextField className="full" id="outlined-textarea" label="Nachricht" multiline variant="outlined" rows="8" helperText="Beschreibe in wenigen Worten was du von dem shooting erwartest."required/>
                                <Button className="submit" type="submit" variant="contained" style={{ 'min-height': ` 55.4px`, 'grid-column': ` 2`, "margin-top": `10px` }} color="primary" >
                                    Senden
                                </Button>
                            </div>
                        </ThemeProvider>

                        <input type="hidden" name="form-name" value="Book a Shooting" />
                        <p style={{ opacity: 0, height: `0px`, width: `0px`, position: `absolute` }}>
                            <label>FCKBOTS: <input name="important-field" /></label>
                        </p>

                    </form>

                </section>
            </article>
        </div>
    </Layout>
)

export default BookShooting
