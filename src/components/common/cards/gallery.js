import React from 'react'
import Img from 'gatsby-image'

const gallery = {
    name: `gallery`,
    type: `html`,
    render({ payload }){
        return <div className={ `gallery` }>
            {payload.images.map(image => (

                <div className={ `gallery-card` }key={image.imageNode.id} style={{ flex: 10 * image.imageNode.childImageSharp.fluid.aspectRatio + ` ` + 10 * image.imageNode.childImageSharp.fluid.aspectRatio + ` ` + 300 * image.imageNode.childImageSharp.fluid.aspectRatio + `px` }}>
                    <Img fluid={image.imageNode.childImageSharp.fluid} alt={ payload.alt } />
                </div>
            ))}

        </div>
    },
}
export default gallery
