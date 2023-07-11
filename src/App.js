import { useEffect, useState } from 'react';
import './App.css';
import MainContainer from './components/containers/MainContainer';
import axios from 'axios';

const API_URL = 'https://amatoscar.pt/gap/apis/nos/callsHistory.php';

function App() {
  const [calls, setCalls] = useState({});
  const [lastUpdated, setLastUpdated] = useState('');

  const getCallData = () => {
    axios
      .get(API_URL)
      .then((response) => {
        setCalls(response.data);
        const currentDate = new Date().toLocaleString('en-GB', {
          timeZone: 'Europe/Lisbon',
        });
        setLastUpdated(currentDate);
        console.log('Call data fetched:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching call data:', error);
      });
  };

  useEffect(() => {
    // Fetch data initially
    getCallData();

    // Set up polling interval to fetch data every 1:30 min (adjust as needed)
    const interval = setInterval(getCallData, 90000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return <MainContainer calls={calls} lastUpdated={lastUpdated} />;
}

export default App;
