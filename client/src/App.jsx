import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ username: "", message: "", rating: 1 });

  useEffect(() => {
    getMessages();
  }, []);

  async function getMessages() {
    //call api
    const response = await fetch(
      "https://database-driven-app-week07-project.onrender.com/messages"
    );
    console.log(response);
    //extract data from response
    const messages = await response.json();
    console.log(messages);
    //update our state with this new data
    setMessages(messages);
  }

  function handleChange(event) {
    console.log("Type in an input happened");
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Form is submitted");
    console.log(form);
    await fetch(
      "https://database-driven-app-week07-project.onrender.com/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    setForm({
      username: "",
      message: "",
      rating: "",
    });
    getMessages();
  }
  return (
    <div className="header-display">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
        </Routes>
      </BrowserRouter>
      <div>
        <h2>Post new review here</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Message"
            onChange={handleChange}
          ></textarea>
          <input
            name="rating"
            placeholder="Rating"
            type="number"
            min="1"
            max="5"
            onChange={handleChange}
          />
          <button type="submit">Send</button>
        </form>

        <h2>Reviews & Ratings</h2>

        {messages.map(function (message) {
          return (
            <div className="message-display" key={message.username}>
              <h4 key={message.username}>{message.username}</h4>
              <h4 key={message.message}>{message.message}</h4>
              <h4 key={message.rating}>{message.rating}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
