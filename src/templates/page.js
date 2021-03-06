import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Layout, Mobiledoc, ContactForm } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const Page = ({ data, location }) => {
    const page = data.ghostPage
    const files = data.allFile.edges
    const checkForm = page.tags.find(hasForm)

    function hasForm(tag) {
        return tag.name === `#contactForm`
    }

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
            />
            <Layout>
                <div className="container">
                    <article className="content">
                        <header className="post-full-header">
                            <h1 className="content-title">{page.title}</h1>
                            <p className="content-excerpt">{page.excerpt}</p>
                            <div className="content-by-line">
                            </div>
                        </header>
                        <section className="post-full-content">
                            { page.feature_image ?
                                <figure className="post-feature-image">
                                    <Img fluid={page.feature_image_local.childImageSharp.fluid} alt={ page.title }/>
                                </figure> : null }
                            {/* The main page content */ }
                            <section
                                className="content-body load-external-scripts">
                                <Mobiledoc mobiledoc={page.parsed_mobiledoc.mobiledoc} files={files}/>
                            </section>
                        </section>
                    </article>
                    {checkForm ?
                        <section
                            className="post-full-content content-body ">
                            <ContactForm></ContactForm>
                        </section>
                        : null}
                </div>
            </Layout>
        </>
    )
}

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
            parsed_mobiledoc{
              mobiledoc
            }
            feature_image_local{
              childImageSharp {
                fluid(maxWidth: 4000, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                  presentationWidth
                }
              }
            }
        }

        allFile {
          edges {
            node {
              id
              publicURL
              childImageSharp {
                id
                fluid(maxWidth: 1000, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                  presentationWidth
                }
              }
            }
          }
        }
    }
`
