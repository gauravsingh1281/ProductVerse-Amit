import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from "react-redux";
import App from './App'
import './index.css';
import { store } from './store/Store';
 import { ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
)
