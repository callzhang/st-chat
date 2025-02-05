import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import { marked } from 'marked'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import hljs from "highlight.js"
import 'highlight.js/styles/atom-one-light.css'
import { imageFetcher } from "./utils"

const node = document.body.getClientRects()[0]
const base = node.width * 0.6

marked.use({
  renderer: {
    image(href, title, text) {
      if (!href) return ''
      const { width, height } = imageFetcher.read(href)
      const w = width > base ? base : width
      const h = (w * height) / width
      return `<img src="${href}" alt="${text}" style="width: ${w}px; height: ${h}px" />`
    },
  },
})

class Chat extends StreamlitComponentBase {
  public render = (): ReactNode => {
    const { isUser, avatarStyle, seed, message } = this.props.args;
    const avatarUrl = `https://avatars.dicebear.com/api/${avatarStyle}/${seed}.svg`
    
    // Streamlit sends us a theme object via props that we can use to ensure
    // that our component has visuals that match the active theme in a
    // streamlit app.
    const { theme } = this.props
    
    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    if (!theme) {
      return <div>Theme is undefined, please check streamlit version.</div>
    }
    
    // styles for the avatar image
    const Avatar = styled.img({
      border: `1px solid transparent`,
      borderRadius: '50%',
      height: '3rem',
      width: '3rem',
      margin: 0
    })
    
    // styles for the message box
    const Message = styled.div({
      display: 'inline-block',
      background: theme.secondaryBackgroundColor,
      border: '1px solid transparent',
      borderRadius: '10px',
      padding: '10px 14px',
      margin: '5px 20px',
      maxWidth: '70%'
    })
    
    // styles for the container
    const Chat = styled.div({
      display: 'flex',
      // flexDirection: 'row',
      fontFamily: `${theme.font}, 'Segoe UI', 'Roboto', sans-serif`, 
      height: 'auto',
      margin: 0,
      width: '100%'
    }, 
    (props: {isUser: boolean}) => {  // specific styles
      if (props.isUser){
        return css`
          flex-direction: row-reverse;
          & > div {
            text-align: right;
          }
        `
      }
      return css``
    })

    return (
      <Chat isUser={isUser} className="chat">
        <Avatar src={avatarUrl} alt="profile" draggable="false"/>
        <Message
          className="message"
          dangerouslySetInnerHTML={{
            __html: marked(message, {
              highlight: code => hljs.highlightAuto(code).value,
            }) || '',
          }}
        />
      </Chat>
    )
  }
}

export default withStreamlitConnection(Chat);
