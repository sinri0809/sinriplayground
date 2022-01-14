import React, { useState } from "react";
import { createUserWithEmailAndPassword, 
  GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authService } from "../database";

const Login = () => {
  const [newAccount, setNewAccount] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginSNS = async (event) => {
    const { target: {value}} = event;
    let provider;
    if(value === "Google"){
      provider = new GoogleAuthProvider();
    }else if(value === "Github"){
      provider = new GithubAuthProvider();
    }
    const signIn = await signInWithPopup(authService, provider);
    console.log(signIn);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try{
      if(newAccount){
        await createUserWithEmailAndPassword(authService, email, password);
      }else{
        await signInWithEmailAndPassword(authService, email, password);
      }
    }catch{
      throw new Error("you failed Login")
    }
  }

  const onEmail = (e) => setEmail(e.target.value);
  const onPassword = (e) => setPassword(e.target.value);
  const toggleState = () => setNewAccount((prev) => !prev);

  return <div className="container">
    <form onSubmit={onSubmit}>
      <input type="email" placeholder="your email" required 
        onChange={onEmail}
      />
      <input type="password" maxLength={20} required 
        onChange={onPassword}
      />
      <input type="submit" value={newAccount?"Create Account":"Login"} />
    </form>
    <div>
      <span>
        {
          newAccount?
          "Already have ID?"
          :"Are you first here?"
        }
      </span>
      <button onClick={toggleState}>
        {
          newAccount?
          "Login"
          :"NEW Account"
        }
      </button>
    </div>
    <div>
      <button value="Google" onClick={onLoginSNS}>Login with Google</button>
      <button value="Github" onClick={onLoginSNS}>Login with Github</button>
    </div>
  </div>
}

export default Login;