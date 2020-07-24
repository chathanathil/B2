import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const sendMail = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/users/sendmail", {
        name: name,
        email: email,
        phone: phone,
        description: description,
      })
      .then((res) => setSuccessMessage(res.data.message))
      .catch((err) => setErrors(err.response.data.err));
  };

  return (
    <div>
      <input
        className="input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      {errors.name != null && errors.name}
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />{" "}
      {errors.email != null && errors.email}
      <input
        className="input"
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />{" "}
      {errors.phone != null && errors.phone}
      <input
        className="input"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      {errors.description != null && errors.description}
      <button onClick={(event) => sendMail(event)}>Send</button>
      {successMessage != "" && successMessage}
    </div>
  );
};

export default App;
