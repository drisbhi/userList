import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  // const api = "https://jsonplaceholder.typicode.com/users";
  const [singleUser, setSingleUser] = useState(false);
  const [user, setUser] = useState([]);
  const [api, SetApi] = useState("https://jsonplaceholder.typicode.com/users");
  const [rowValue, setRowValue] = useState(1);
  const [userCopy, setUserCopy] = useState([]);

  useEffect(() => {
    (async () => {
      const userData = await fetch(api);
      const userJson = await userData.json();
      if (Array.isArray(userJson)) {
        setSingleUser(false);
        setUser(userJson);
        setUserCopy(userJson);
      } else {
        setSingleUser(true);
        setUser([userJson]);
      }
    })();
  }, [api]);
  useEffect(() => {
    if (rowValue) {
      const temp = userCopy.slice(0, Number(rowValue));
      console.log("rowValue" + rowValue);
      console.log(temp + "temp");
      setUser(temp);
    } else {
      setUser(userCopy);
    }
  }, [rowValue]);
  const handleDelete = (e) => {
    const idx = Number(e.target.id);
    const filterUser = user.filter((userObj) => {
      return Number(userObj.id) !== idx;
    });
    setUser(filterUser);
  };
  const resetHandler = () => {
    console.log("Reset Handler Called");
    SetApi("https://jsonplaceholder.typicode.com/users");
    setRowValue(undefined);
  };

  const handleOpen = (id) => {
    console.log("handleOpen id> ", id);
    console.log(`${api}/${id}`);
    SetApi(`${api}/${id}`);
  };
  const handleName = () => {
    const copyUser = [...user];
    copyUser.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    setUser(copyUser);
  };
  const handleEmail = () => {
    const copyUser = [...user];
    copyUser.sort((a, b) => {
      return a.email > b.email ? 1 : -1;
    });
    setUser(copyUser);
  };
  return (
    <div>
      <div>
        <button onClick={handleEmail}>Sort by Email</button>
        <button onClick={handleName}>Sort by Name</button>
        <span> Select Rows: </span>
        <input
          type="number"
          min="1"
          max="10"
          value={rowValue !== undefined ? rowValue : 1}
          onChange={(e) => setRowValue(e.target.value)}
        />
        <button onClick={resetHandler}>Reset</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>username</th>
            <th>email</th>
            <th>address</th>
            <th>phone</th>
            <th>website</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(user) &&
            user.map((userObj) => {
              //console.log(userObj);
              return (
                <tr key={userObj.id}>
                  <td>{userObj.name}</td>
                  <td>{userObj.username}</td>
                  <td>{userObj.email}</td>
                  <td>{userObj.address.street}</td>
                  <td>{userObj.phone}</td>
                  <td>{userObj.website}</td>
                  <td>{userObj.company.name}</td>
                  <td>
                    {!singleUser ? (
                      <button
                        onClick={() => handleOpen(userObj.id)}
                        id={userObj.id}
                      >
                        Open
                      </button>
                    ) : null}
                  </td>
                  <td>
                    <button onClick={handleDelete} id={userObj.id}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
