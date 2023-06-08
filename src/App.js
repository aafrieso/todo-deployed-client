import ListHeader from "./components/ListHeader";
import ListItem from './components/ListItem';
import Auth from "./components/Auth";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [authToken]);

  console.log(tasks);

  // Sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={' Your To do list 🧹'} getData={getData} />
          <p>Welcome back! {userEmail}</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            sortedTasks?.map((task) => (
              <ListItem key={task.id} task={task} getData={getData} />
            ))
          )}
        </>
      )}
      <p>Make Today a Great Day! 🌞 </p>
    </div>
  );
}

export default App;
