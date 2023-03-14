import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import Chat from "./stChat"

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <Chat />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
)
