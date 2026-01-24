import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// styles for react-tabs (Admin Dashboard active tab card styling)
import "react-tabs/style/react-tabs.css";  
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
