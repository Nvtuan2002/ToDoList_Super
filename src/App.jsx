import './App.css'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './router';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '@/redux/store'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}

export default App
