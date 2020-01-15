import React from 'react'

const code = {
    name: `code`,
    type: `html`,
    render({ payload }){
        return <pre>
            <code>{payload.code}</code>
        </pre>
    },
}

export default code
