import { Link } from "react-router-dom";
import { sinri } from "../database";
import Comment from './Comment';
import Contents from "./Contents";



const Home = ({user}) => {
  return <>
  
    <Link to="/user">User Page</Link>
    {
      user.uid === sinri.id &&
      <Link to="/content">+upload</Link>
    }
    <p>file upload is only available for me😊</p>
    <p>But comment is available</p>
    <Comment user={user} />
    <Contents />
  </>
}

export default Home;