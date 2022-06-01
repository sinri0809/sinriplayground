import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider, GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import { authService } from "../data/database";

const Login = () => {
  const [newAccount, setNewAccount] = useState(true);

  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userInput, setUserInput] = useState({
    email: '',
    pw: ''
  });

  const onLoginSNS = async (event) => {
    const { target: { value } } = event;
    let provider;
    if (value === "Google") {
      provider = new GoogleAuthProvider();
    } else if (value === "Github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(userInput);
    const { email, pw } = userInput;
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, pw);
      } else {
        await signInWithEmailAndPassword(authService, email, pw);
      }
    } catch {
      window.alert("아이디나 비밀번호가 틀렸습니다");
      throw new Error("you failed Login");
    }
  }

  // const onEmail = (e) => setEmail(e.target.value);
  const onEmail = (event) => {
    const { target: { value } } = event;
    const newInput = { ...userInput, email: value };
    setUserInput(newInput);
  };

  const onPassword2 = (event) => {
    const { target: { value } } = event;
    const newInput = { ...userInput, pw: value };
    setUserInput(newInput);
  };

  // const onPassword = (e) => setPassword(e.target.value);
  const toggleState = () => setNewAccount((prev) => !prev);

  return <div className="container">
    <form onSubmit={onSubmit}>
      <input type="email" placeholder="your email" required
        onChange={onEmail}
      />
      <input type="password" maxLength={20} required
        onChange={onPassword2}
      />
      <input type="submit" value={newAccount ? "Create Account" : "Login"} />
    </form>
    <div>
      <div>
        {
          newAccount ?
            "Already have ID?"
            : "Are you first here?"
        }
      </div>
      <button onClick={toggleState}>
        {
          newAccount ?
            "Login"
            : "NEW Account"
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