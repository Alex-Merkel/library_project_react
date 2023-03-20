import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AuthChecker from './auth/AuthChecker';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <HashRouter>
      <Navbar />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<AuthChecker><Dashboard /></AuthChecker>} />
        </Routes>
      </Provider>
    </HashRouter>
  );
}

export default App;