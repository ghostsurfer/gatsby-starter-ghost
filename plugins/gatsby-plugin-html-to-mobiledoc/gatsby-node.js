const get = require(`lodash/get`)
const converter = require(`@tryghost/html-to-mobiledoc`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node,
    actions,
    createContentDigest,
    store,
    cache,
    createNodeId }, options) => {
    const { createNode } = actions
    const {
        nodeType,
        htmlPath,
        name = `parsed_mobiledoc`,
    } = options

    if (node.internal.type === nodeType) {
        const mobiledoc = converter.toMobiledoc(get(node, htmlPath))
        const fieldData = JSON.stringify(mobiledoc)
        const nodeContent = {
            // Data for the node.
            mobiledoc: fieldData,
            // Required fields.
            id: node.id + `_mobiledoc`,
            parent: node.id, // or null if it's a source node without a parent
            children: [],
            internal: {
                type: `mobiledocGhostContent`,
                contentDigest: createContentDigest(fieldData),
            },

        }

        // Adds a field `localImage` or custom name to the node
        // ___NODE appendix tells Gatsby that this field will link to another node
        node[`${name}___NODE`] = node.id + `_mobiledoc`

        return downloadAllImages(nodeContent, store, cache, createNode, createNodeId)
            .then(node => createNode(node))
    }
}

function downloadAllImages(nodeContent, store, cache, createNode, createNodeId){
    const _nodeContent = nodeContent
    const mobiledoc = JSON.parse(_nodeContent.mobiledoc)

    const mapProm = mobiledoc.cards.map((card) => {
        if (card[0] === `image`){
            return createRemoteFileNode({
                url: card[1].src,
                store,
                cache,
                createNode,
                createNodeId,
            }).then((fileNode) => {
                card[1].imageNode = fileNode.id
            })
        }

        if (card[0] === `gallery`){
            const galleryProm = card[1].images.map(image => createRemoteFileNode({
                url: image.src,
                store,
                cache,
                createNode,
                createNodeId,
            }).then((fileNode) => {
                image.imageNode = fileNode.id
            }))

            return Promise.all(galleryProm).then(() => card)
        }

        return null
    })

    return Promise.all(mapProm).then(() => {
        _nodeContent.mobiledoc = JSON.stringify(mobiledoc)

        return _nodeContent
    })
}
