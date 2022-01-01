import Login from "./Login";
import { deleteUser } from "firebase/auth";
import { authService } from "../database";


const Logout = ({user}) => {
  const onLogout = (event) => {
    event.preventDefault();
    const confirm = window.confirm("Singed Out?");
    if(confirm){
      let result = authService.signOut();
      console.log(result);
    }
  }
  const onDeleteAccount = (event) => {
    event.preventDefault();
    if(window.confirm("Really?")){
      if(window.confirm("Seriously?")){
        deleteUser(user)
      }
    }
  }
  return <div className="container">
    <button onClick={onLogout}>Logout</button>
    <button onClick={onDeleteAccount}>Delete Account</button>
  </div>
}

const User = ({login, user}) => {
  return <>
    {
      login ?
      <Logout user={user}/>
      :
      <Login />
    }
  </>
}

export default User;