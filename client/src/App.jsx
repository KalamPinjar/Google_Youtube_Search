import { useEffect, useState } from "react";
import axios from "axios";
export default function App() {
  const [data, setData] = useState([]);
  const test = async () => {
    const res = await axios.get("http://localhost:3000/api");
    setData(res.data);
  };
  useEffect(() => {
    test();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello from {data.message}
      </h1>
    </div>
  );
}
