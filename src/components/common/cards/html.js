import React from 'react'

const html = {
    name: `html`,
    type: `html`,
    render({ payload }){
        return <div dangerouslySetInnerHTML={{ __html: payload.html }} />
    },
}
export default html
