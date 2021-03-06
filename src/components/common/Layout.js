import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Navigation } from '.'
// Styles
// import '../../styles/app.css'
import '../../styles/index.scss'

/**
* Main layout component
*
* The Layout component wraps around each page and tmeplate.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass }) => {
    const site = data.allGhostSettings.edges[0].node
    //  const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    //  const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <div className="site-head" Tag="header">

                        <Link className="site-title" to={`/`}>{site.title}</Link>

                        <nav className="site-nav">
                            <div className="site-nav-left">
                                {/* The navigation items as setup in Ghost */}
                                <Navigation data={site.navigation} navClass="site-nav-item" />
                            </div>
                        </nav>
                        <div className="menu-icon" onClick={toggleMenu}>
                            <div className="menu-top"></div>
                            <div className="menu-middle"></div>
                            <div className="menu-bottom"></div>
                        </div>
                    </div>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>

                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        {site.title} © {new Date().getFullYear()}<Navigation data={site.secondary_navigation} navClass="site-nav-item" />
                    </footer>

                </div>
            </div>
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                            cover_image_local{
                              childImageSharp {
                                fluid(maxWidth: 1000, quality: 100) {
                                  ...GatsbyImageSharpFluid_withWebp
                                  presentationWidth
                                  aspectRatio
                                }
                              }
                            }
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)
// Toggle Function menu

let toggleNavStatus = false

function toggleMenu(){
    let getMenu = document.querySelector(`.site-nav`)
    let getMenuIcon = document.querySelector(`.menu-icon`)

    if (toggleNavStatus === false) {
        getMenu.classList.add(`open`)
        getMenuIcon.classList.add(`open`)

        toggleNavStatus = true
    } else {
        getMenu.classList.remove(`open`)
        getMenuIcon.classList.remove(`open`)

        toggleNavStatus = false
    }
}

export default DefaultLayoutSettingsQuery
