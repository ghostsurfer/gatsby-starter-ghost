import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

import { Layout, Mobiledoc, ContactForm } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    const files = data.allFile.edges
    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Layout>
                <div className="container">
                    <article className="content">
                        <header className="post-header container large">
                            { post.primary_tag ? <p className="content-primary-tag"><Link to={`tag/` + post.primary_tag.slug} >{post.primary_tag.name}</Link></p> : null}
                            <h1 className="post-title">{post.title}</h1>
                        </header>
                        <p className="post-excerpt container medium">{post.excerpt}</p>
                        {/* post.authors ?
                                    <div className="content-by-line">
                                        <ul className="author-list">
                                            {post.authors.map(author => (

                                                <Link key={author.slug} to={`author/` + author.slug} class="author-avatar">
                                                    <img className="author-profile-image" src={author.profile_image} alt={author.name} />
                                                </Link>
                                            ))}

                                        </ul>
                                    </div>
                                    : null */}
                        { post.feature_image ?
                            <figure className="post-media container large" style={{ flex: post.feature_image_local.childImageSharp.fluid.aspectRatio + ` ` + post.feature_image_local.childImageSharp.fluid.aspectRatio + ` ` + 400 * post.feature_image_local.childImageSharp.fluid.aspectRatio + `px` }}>
                                <Img fluid={post.feature_image_local.childImageSharp.fluid} alt={ post.title } />
                            </figure> : null }
                        {/* The main post content */ }
                        <Mobiledoc mobiledoc={post.parsed_mobiledoc.mobiledoc} files={files}/>
                    </article>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
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
