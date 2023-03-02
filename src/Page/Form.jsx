import React,{useState} from 'react'

function Form() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
  
    const validate = () => {
      const errors = {};
  
      if (!name) {
        errors.name = 'Name is required';
      }else if(name.length<7){
        errors.name = 'add more word';
      }
  
      if (!email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid';
      }
  
      if (!password) {
        errors.password = 'Password is required';
      }else if(password.length<7){

        errors.password = 'enter more word';
      }
  
      return errors;
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const errors = validate();
  
      if (Object.keys(errors).length === 0) {
        // Submit form
      } else {
        setErrors(errors);
      }

      console.log(errors)
    };
  
  return (
    <div>

<form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
     <p>  {errors.name && <span>{errors.name}</span>}</p> 
      </label>
      <br />
      
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p>  {errors.email && <span>{errors.email}</span>}</p>
      </label>
      <br />
    

      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <p> {errors.password && <span>{errors.password}</span>}</p> 
      </label>

      <br />
      
      <button type="submit">Submit</button>
    </form>

    </div>
  )
}

export default Form