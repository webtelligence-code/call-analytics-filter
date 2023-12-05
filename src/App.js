import { useEffect, useState } from 'react';
import './App.css';
import MainContainer from './components/containers/MainContainer';
import axios from 'axios';
import chalk from 'chalk';

const API_CALLS_URL = 'https://amatoscar.pt/gap/apis/nos/callsHistory.php';
const API_URL = 'https://amatoscar.pt/gap/NovasPlataformas/_API/call-analytics-filter/index.php';

function App() {
  const [calls, setCalls] = useState({});
  const [departments, setDepartments] = useState([]);
  const [concessions, setConcessions] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [lastUpdated, setLastUpdated] = useState('');
  const [groupedConcessions, setGroupedConcessions] = useState([]);
  const [groupedCities, setGroupedCities] = useState([]);

  const getCurrentUser = () => {
    axios.get(API_URL, {
      params: {
        action: 'get_current_user'
      }
    })
      .then((response) => {
        setCurrentUser(response.data);
        console.log(chalk.black.bgGreen('Current User data fetched.'), response.data);
      })
      .catch((error) => {
        console.log(chalk.black.bgRed('Error fetching current user data.'), error);
      })
  }

  const getAllDepartments = () => {
    axios.get(API_URL, {
      params: {
        action: 'get_all_departments'
      }
    })
      .then((response) => {
        setDepartments(response.data);
        console.log(chalk.black.bgGreen('Current User data fetched.'), response.data);
      })
      .catch((error) => {
        console.log(chalk.black.bgRed('Error fetching current user data.'), error);
      })
  }

  const getGroupedCities = () => {
    axios.get(API_URL, {
      params: {
        action: 'get_grouped_cities'
      }
    })
      .then((response) => {
        setGroupedCities(response.data);
        console.log(chalk.black.bgGreen('Grouped departments data fetched.'), response.data);
      })
      .catch((error) => {
        console.log(chalk.black.bgRed('Error fetching current user data.'), error);
      })
  }

  const getGroupedConcessions = () => {
    axios.get(API_URL, {
      params: {
        action: 'get_grouped_concessions'
      }
    })
      .then((response) => {
        setGroupedConcessions(response.data);
        console.log(chalk.black.bgGreen('Grouped departments data fetched.'), response.data);
      })
      .catch((error) => {
        console.log(chalk.black.bgRed('Error fetching current user data.'), error);
      })
  }

  const getConcessions = () => {
    axios.get(API_URL, {
      params: {
        action: 'get_concessions'
      }
    })
      .then((response) => {
        setConcessions(response.data);
        console.log(chalk.black.bgGreen('Concessions fetched successfully.'), response.data);
      })
      .catch((error) => {
        console.log(chalk.black.bgRed('Error fetching concessions from database.'), error);
      })
  }

  const getCities = () => {
    axios.get(API_URL, {
      params: {
        action: 'get_cities'
      }
    })
      .then((response) => {
        setCities(response.data);
        console.log(chalk.black.bgGreen('Cities fetched successfully.'), response.data);
      })
      .catch((error) => {
        console.log(chalk.black.bgRed('Error fetching concessions from database.'), error);
      })
  }

  const getCallData = () => {
    axios
      .get(API_CALLS_URL)
      .then((response) => {
        setCalls(response.data);
        const currentDate = new Date().toLocaleString('en-GB', {
          timeZone: 'Europe/Lisbon',
        });
        setLastUpdated(currentDate);
        console.log(chalk.black.bgGreen('Call data fetched:'), response.data);
      })
      .catch((error) => {
        console.log(chalk.black.bgRed('Error fetching call data:'), error);
      });
  };

  useEffect(() => {
    // Fetch current user data first
    getCurrentUser();
    // Fetch all cities
    getCities()
    // Fetch all departments
    getAllDepartments();
    // Fetch Grouped Departments
    getGroupedConcessions();
    // Fetch Grouped Cities
    getGroupedCities();
    // Fetch concessions data second.
    getConcessions();

    // Wait for the getConcessions data to be fetched before fetching call data
    const fetchCallData = setTimeout(() => {
      getCallData();
    }, 0);

    // Set up polling interval to fetch data every 1:30 min (adjust as needed)
    const interval = setInterval(getCallData, 90000);

    // Clean up interval and timeout on component unmount
    return () => {
      clearInterval(interval);
      clearTimeout(fetchCallData);
    };
  }, []);

  return <MainContainer
    currentUser={currentUser}
    calls={calls}
    departments={departments}
    cities={cities}
    concessions={concessions}
    lastUpdated={lastUpdated}
    groupedConcessions={groupedConcessions}
    groupedCities={groupedCities}
  />;
}

export default App;