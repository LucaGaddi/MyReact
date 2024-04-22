import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard as DashboardIcon } from "react-icons/lu";

import Header from "../components/Header";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confermaPassword, setConfermaPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const saveData = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (!email.trim()) {
      errors.email = 'L\'email inserita non è valida';
    }
    if (name.length < 3) {
      errors.name = 'Il nome deve avere almeno 3 caratteri';
    }
    if (password.length < 8) {
      errors.password = 'La password deve contenere almeno 8 caratteri';
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'La password deve contenere almeno una lettera maiuscola';
    } else if (!/\d/.test(password)) {
      errors.password = 'La password deve contenere almeno un numero';
    } else if (password !== confermaPassword) {
      errors.confermaPassword = 'Le password non corrispondono';
    }

    // Se non ci sono errori, invia il modulo
    if (Object.keys(errors).length === 0) {
      // Salva i dati nel localStorage
      saveData();
      // Invio del modulo, ad esempio, tramite una chiamata API
      alert('Registrazione avvenuta con successo!');
      // Naviga alla pagina di login
      navigate("/login");
    } else {
      // Aggiorna lo stato degli errori
      setErrors(errors);
    }
  };

  return (
    <div>
      <Header title="Signup" icon={<DashboardIcon />} to="/" />
      <Card>
        <h1>SignUp</h1>
        <hr className="h-1 w-32 bg-dark-green" />
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full">
            <div>
              <Input type="text" placeholder="Inserisci il tuo nome" value={name} onChange={event => setName(event.target.value)} />
              {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
            </div>
            <div>
              <Input type="email" placeholder="Inserisci la tua email" value={email} onChange={event => setEmail(event.target.value)} />
              {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>
            <div>
              <Input type="password" placeholder="Inserisci la tua password" value={password} onChange={event => setPassword(event.target.value)} />
              {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            </div>
            <div>
              <Input type="password" placeholder="Conferma password" value={confermaPassword} onChange={event => setConfermaPassword(event.target.value)} />
              {errors.confermaPassword && <span style={{ color: 'red' }}>{errors.confermaPassword}</span>}
            </div>
          </div>
          <div className="w-full">
            <Button title="Crea Account" type="submit" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Signup;
