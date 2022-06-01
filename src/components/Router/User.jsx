import Login from "./../Login";
import { deleteUser } from "firebase/auth";
import { authService } from "../../data/database";
import { useSelector } from 'react-redux';

const Logout = ({ user }) => {
  const onLogout = (event) => {
    event.preventDefault();
    const confirm = window.confirm("Singed Out?");
    if (confirm) {
      let result = authService.signOut();
      console.log(result);
    }
  }
  const onDeleteAccount = (event) => {
    event.preventDefault();
    if (window.confirm("Really?")) {
      if (window.confirm("Seriously?")) {
        deleteUser(user);
      }
    }
  }
  return <div className="container">
    <button>🌙night</button>
    <button onClick={onLogout}>Logout</button>
    <button onClick={onDeleteAccount}>Delete Account</button>
  </div>
}
// const store = configureStore({ reducer : reducerName1});


const User = () => {
  const state = useSelector((state) => state.user);
  const { login, user } = state;
  return <>
    {
      login ?
        <Logout user={user} />
        :
        <Login />
    }
  </>
}



export default User;