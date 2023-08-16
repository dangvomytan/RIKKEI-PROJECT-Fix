
import { BrowserRouter } from 'react-router-dom'
// import './App.css'
import  Router  from './routers/router'
import store from './redux/store/store'
import { Provider } from 'react-redux'



function App() {
  return (
  <Provider store={store}>
    <BrowserRouter>
    <Router/>
    </BrowserRouter>
  </Provider>
  )
}

export default App
