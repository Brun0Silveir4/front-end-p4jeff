
import { RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home'
import router from './router'

function App() {

  return <RouterProvider router={router} />
}

export default App
