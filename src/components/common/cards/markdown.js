import React from 'react'
const ReactMarkdown = require(`react-markdown`)

const markdown = {
    name: `markdown`,
    type: `html`,
    render({ payload }){
        return <ReactMarkdown source={payload.markdown} />
    },
}
export default markdown
