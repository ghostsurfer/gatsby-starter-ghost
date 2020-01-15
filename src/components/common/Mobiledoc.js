import PropTypes from 'prop-types'
import React from 'react'
import { hr, image, code, embed, html, gallery, markdown } from './cards'
import MobiledocReactRenderer from '@dailybeast/mobiledoc-react-renderer'
const ReactMarkdown = require(`react-markdown`)

class Mobiledoc extends React.Component {
  static propTypes = {
      mobiledoc: PropTypes.string.isRequired,
      files: PropTypes.array.isRequired,
  };

  constructor(props) {
      super(props)

      const options = { atoms: [], cards: [image, code, embed, hr, html, markdown, gallery], markups: [] }

      this.renderer = new MobiledocReactRenderer(options)
  }

  render() {
      const mobiledoc = JSON.parse(this.props.mobiledoc)
      const files = this.props.files

      mobiledoc.cards.map((card) => {
          if (card[0] === `image`){
              function findFile(element) {
                  return element.node.id === card[1].imageNode
              }
              const i = files.findIndex(findFile)
              const imageNode = files[i]
              if (imageNode){
                  card[1].imageNode = imageNode.node
              }
          }
          if (card[0] === `gallery`){
              card[1].images.map((image) => {
                  function findFile(element) {
                      return element.node.id === image.imageNode
                  }
                  const i = files.findIndex(findFile)
                  const imageNode = files[i]
                  if (imageNode){
                      image.imageNode = imageNode.node
                  }

                  return card
              })
          }

          return card
      })

      return this.renderer.render(mobiledoc)
  }
}

export default Mobiledoc
