import axios from 'axios';
import {useState,useEffect} from 'react';
function App(){
  const[users,setUsers] = useState([]);
  const[name,setName] = useState();
  const[age,setAge] = useState();
  const[branch,setBranch] = useState();
  //const[user,deleteUser] = useState();

  const submit =()=>{
    axios.post("http://localhost:5000/getUsers/",{name,age,branch})
    .then().catch((err) => console.log(err));
  }
  const Delete = ()=> {
    axios.delete("http://localhost:5000/getUsers/")
  }
  useEffect(()=>{
    axios.get("http://localhost:5000/getUsers/")  
    .then((us) => {
      console.log(us);
      setUsers(us.data)
    }).catch((err) => console.log(err));
  },[]);
  return(
    <>
    {
      users.map((x) => {
        return(
          <>
          <center>
          <h1>{x._id}</h1>
          <h1>{x.name}</h1>
          <h1>{x.age}</h1>
          <h1>{x.branch}</h1>
          </center>
          </>
        )
      })
    }
    <center>
    
    <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
    <br></br>
    
    <input type="text" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
    <br></br>
    
    <input type="text" placeholder="Branch" onChange={(e) => setBranch(e.target.value)} />
    <br></br>
    <button onClick={submit}>ClickeMe</button>
    <button onClick={Delete} >Delete User</button>




    </center>
    </>
  )
}
export default App;
