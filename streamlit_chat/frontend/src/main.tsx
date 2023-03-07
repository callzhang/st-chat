import React from "react"
import ReactDOM from "react-dom"
import { StreamlitProvider } from "streamlit-component-lib-react-hooks"
import App from "./App"

ReactDOM.render(
  <React.StrictMode>
    <StreamlitProvider>
      <App />
    </StreamlitProvider>
  </React.StrictMode>,
  document.getElementById("root")
)