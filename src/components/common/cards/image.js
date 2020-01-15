import React from 'react'
import Img from 'gatsby-image'

const image = {
    name: `image`,
    type: `html`,
    render({ payload }) {
        if (payload.imageNode.childImageSharp){
            return (
                <div className={`card_width_` + payload.cardWidth}>
                    <Img fluid={payload.imageNode.childImageSharp.fluid} alt={ payload.alt } />
                </div>
            )
        } else {
            return <img src={payload.imageNode.publicURL} alt={ payload.alt }/>
        }
    },
}

export default image
