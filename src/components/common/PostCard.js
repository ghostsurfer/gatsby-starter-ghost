import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const PostCard = ({ post }) => {
    const url = `${post.slug}/`
    return (
        <Link to={url} className="post-card" style={{ flex: 10 * post.feature_image_local.childImageSharp.fluid.aspectRatio + ` ` + 10 * post.feature_image_local.childImageSharp.fluid.aspectRatio + ` ` + 400 * post.feature_image_local.childImageSharp.fluid.aspectRatio + `px` }}>
            {post.feature_image &&
                    <Img fluid={post.feature_image_local.childImageSharp.fluid}/>}
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default PostCard
