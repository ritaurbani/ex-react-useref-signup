// Cos'è isUserNameValid?
// È una variabile(non una funzione!) grazie a useMemo.

// const isUserNameValid = useMemo(() => { /* logica */ }, [username]);
// useMemo memorizza il risultato della funzione e lo assegna a isUserNameValid.

// Quando username cambia, useMemo ricalcola automaticamente il valore.

// Se non usassi useMemo:
// Dovresti usare una funzione normale e invocarla:

// const isUserNameValid = () => { /* logica */ };
// // Nel JSX:
// { isUserNameValid() ? "Valid" : "Invalid" }
// Ma con useMemo è più efficiente perché evita ricalcoli inutili.
// senza useMemo:
// La funzione viene ricalcolata ad ogni render(anche se username non cambia).
// Con useMemo invece, il calcolo avviene solo quando username cambia.


import { useState, useMemo, useRef } from 'react'

function App() {
  const [description, setDescription] = useState("sono una studentessa")
  const [username, setUsername] = useState("alwaysrita")
  const [password, setPassword] = useState("hello")

  //Campi non controllati
  // const [specialty, setSpecialty] = useState("front-end")
  // const [years, setYears] = useState("1")
  // const [name, setName] = useState("rita")

  const nameRef = useRef()
  const specialtyRef = useRef()
  const yearsRef = useRef()

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\',.<>?/`~";



  //ricalcolata solo nel caso in cui cambia userName > useMemo con dipendenza
  const isUserNameValid = useMemo(() => {
    
    //Deve contenere solo caratteri alfanumerici 
    // e almeno 6 caratteri (no spazi o simboli).
    //controllo se per ognuno dei caratteri vedo se quel carattere e incluso in lettere o numeri
    //return (..logica..) oppure const charsValid come sotto e poi return charsValid
    const charsValid = username.split("").every((char) => 
    letters.includes(char.toLowerCase()) || numbers.includes(char))
    //isUserNameValid sara uguale a:
    return charsValid && username.trim().length >=6
  },[username])//chars di username are valid quando sono incluse in letters, numbers...


 const isPasswordValid = useMemo(() => {
   //Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.
  return (
  password.trim().length >= 8 &&
  //invece di password.spli() posso fare [...password].some.. per ottenere singoli char
  password.split("").some((char) => letters.includes(char)) &&
  password.split("").some((char) => numbers.includes(char)) &&
  password.split("").some((char) => symbols.includes(char)) 
 )}, [password])

 const isDescriptionValid = useMemo(() => {
   // Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).
  return (
    description.trim().length >= 100 && 
    description.trim().length < 1000
 )}, [description])
  
  const submit = (e) => {
    e.preventDefault()
    //raccogliamo qui i valori non controllati
    const name = nameRef.current.value
    const years = yearsRef.current.value
    const specialty = specialtyRef.current.value

    if (//Se l'utente inserisce soli spazi in un campo, 
    // il tuo primo codice lo considererebbe comunque valido:
      //if (name) controlla solo che name non sia null, 
      // undefined o "", ma non vede gli spazi come vuoti!
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specialty.trim() ||
      !years.trim() ||
      years <= 0 || //anni non deve essere numero negativo
      !description.trim() ||
      //qui dobbiamo anche aggiungere le validazioni tempo reale fatte
      !isDescriptionValid ||
      !isPasswordValid ||
      !isUserNameValid
    ) {
      alert("you need to fill the field")
      return;// Blocca l'invio
      } else {
      console.log("Sumbit done:", {
            name,
            username,
            password,
            years,
            description
          })}
}

  return (
    <div>
      <h2>Web Developer Signup</h2>
      <form onSubmit={submit}>
        {/* NAME */}
        <section>
          <label>
            <p>Nome Completo</p>
            <input
              type="text"
              ref={nameRef}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              placeholder="name" />
          </label>
        </section>
        {/* USERNAME */}
        <section>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" />
            {/* ha senso mostrarlo solo se ho scritto (se non e stringa vuota) */}
            {username.trim() && (
              <p style={{color: isUserNameValid? "green" : "red"}}>
                {isUserNameValid? "Username valid" : "Almeno 6 caratteri alfanumerici"}
              </p>
            )}
        </section>
        {/* PASSWORD */}
        <section>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password" />
            {password.trim() && (
              <p style={{color: isPasswordValid? "green" : "red"}}>
                {isPasswordValid? "Password is Valid" : "Password must contain 8 characters and include letters, at least 1 number 1 symbol and "}
              </p>
            )}
        </section>
        {/* SPECIALTY */}
        <section>
          <select 
          ref={specialtyRef}
          // value={specialty} 
          // onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="">Select a specialty</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </section>
        {/* YEARS */}
        <section>
          <input
            type="number"
            ref={yearsRef}
            // value={years}
            // onChange={(e) => setYears(e.target.value)}
            placeholder="years of experience" />
        </section>
        {/* DESCRIPTION */}
        <section>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"> </textarea>
            {description.trim() && 
            <p style={{color: isDescriptionValid? "green" : "red"}}>
              {isDescriptionValid? "Description not valid": `Deve avere tra i 100 e 1000 caratteri ${description.trim().length}`}
            </p>}
        </section>
        <button className='btn' type='sumbmit'>Submit</button>
      </form>
    </div>
  )
}

export default App
