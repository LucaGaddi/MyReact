import { useState } from "react";
import { IoEyeSharp as ShowPassword } from "react-icons/io5";
import { FaEyeSlash as HidePassword } from "react-icons/fa6";
import { SiGnuprivacyguard as Signup } from "react-icons/si";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInputType, setPasswordInputType] = useState("password");
  const navigate = useNavigate();

  function changePasswordInputType() {
    if (passwordInputType === "text") {
      setPasswordInputType("password");
    } else {
      setPasswordInputType("text");
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLogin(event) {
    event.preventDefault();
    // Recupera i dati salvati nel localStorage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    // Controlla se le credenziali corrispondono
    if (email === storedEmail && password === storedPassword) {
      // Login riuscito, puoi navigare l'utente alla dashboard o alla pagina successiva
      navigate("/dashboard");
    } else {
      // Credenziali non valide, mostra un messaggio di errore o gestisci l'errore in base alle tue esigenze
      alert("Credenziali non valide. Si prega di riprovare.");
    }
  }

  return (
    <div>
      <Header title="Login" icon={<Signup />} to="/signup" />
      <Card>
        <h1 className="text-2xl">Login</h1>
        <hr className="h-1 w-32 bg-dark-green" />
        <form className="w-full" onSubmit={handleLogin}>
          {/* email div */}
          <div className="w-full">
            <Input type="email" placeholder="example@test.com" value={email} onChange={event => setEmail(event.target.value)} />
          </div>
          {/* password div */}
          <div className="w-full flex relative">
            <Input type={passwordInputType} placeholder="password" value={password} onChange={handlePasswordChange} />
            <span className="absolute right-3 top-3.5 cursor-pointer" onClick={changePasswordInputType}>
              {passwordInputType === "text" ? <HidePassword /> : <ShowPassword />}
            </span>
          </div>
          {/* Button div */}
          <div className="w-full">
            <Button title="Login" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Login;
