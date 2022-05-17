import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.baseURL = "http://localhost:5000";

function App() {
  const [herokuTest, setHerokuTest] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  /* handlers */
  const fetchData = async () => {
    const result = await axios.get("/api/v1");
    setHerokuTest(result.data.results);
    return;
  };

  return (
    <>
      <div className="App">
        <h1>Hello {herokuTest}</h1>
      </div>
    </>
  );
}

export default App;
