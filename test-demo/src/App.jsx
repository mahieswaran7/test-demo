import React from 'react';
import CityTable from './components/Dashboard/CityTable';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <h1>City Dashboard</h1> */}
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
