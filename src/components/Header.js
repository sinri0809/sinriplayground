import { Link } from 'react-router-dom';
import { sinri } from '../database';

import styled from 'styled-components';
import { useSelector } from 'react-redux';
const Profile = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: white;
`;

const Header = () => {
  console.log("Header is called");
  const state = useSelector((state)=>state.user);  

  return <header>
  <div className="container">
    <nav>
      <mark>
        <Link to="/" title='home'>🏠</Link>
      </mark>
      
      <div>
        <a name="취준생 만화" target="_blank" className='go-cartoon'
          href="https://comic.naver.com/challenge/list?titleId=788320" rel="naverwebtoon noreferrer">
          💾 </a>
        {
          state.uid === sinri.id && // 관리자 일 때,
          <Link to="/content">upload</Link>
        }
        
        <Link to="/user" className='btn-user'>
          {state.uid === "visitor" && "Log In"}
          <Profile src={ state.photoURL ?? "https://firebasestorage.googleapis.com/v0/b/sinriplayground.appspot.com/o/temp_profile.png?alt=media&token=8db0cfe8-2592-4f1e-acbf-0bd44e237bec"} alt="profile" />
        </Link>
      </div>
    </nav>
    <h1>Gallery</h1>
  </div>
  </header>
}

export default Header;