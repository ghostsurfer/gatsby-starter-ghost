import React from 'react'

const embed = {
    name: `embed`,
    type: `html`,
    render({ payload }){
        return (
            <figure className="kg-card kg-embed-card">
                <div className="fluid-width" dangerouslySetInnerHTML={{ __html: payload.html }} />
            </figure>
        )
    },
}

export default embed
