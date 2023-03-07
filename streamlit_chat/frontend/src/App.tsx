import React from "react"
import { useRenderData } from "streamlit-component-lib-react-hooks"
import Avatar41 from './assets/41.svg'
import Avatar42 from './assets/42.svg'
import './App.css'

type Chat = {
  type: 'start' | 'end';
  name?: string;
  content?: string;
  time?: number;
}

const StreamlitChat: React.FC = () => {
  const renderData = useRenderData()

  const { chat } = renderData.args

  return (
    <span>
      {chat.map(({ type, name, content, time }: Chat, index: number) => (
        <div key={index} className={`chat chat-${type}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={type === 'start' ? Avatar42 : Avatar41} />
            </div>
          </div>
          <div className="chat-header">
            {name}
            {time && <time className="text-xs opacity-50 ml-1">
              {new Date(time).toLocaleString()}
            </time>}
          </div>
          <div 
            className="chat-bubble"
            dangerouslySetInnerHTML={{
              __html: content || '',
            }}
          />
        </div>
      ))}
    </span>
  )
}

export default StreamlitChat
