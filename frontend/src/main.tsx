import React from 'react'
import ReactDOM from 'react-dom/client'
import Provider from '@/stores/provider'
import App from './App'
import './index.css'
import 'atropos/css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
)
