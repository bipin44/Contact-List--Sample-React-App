import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import EditContact from "./components/EditContact";
import api from "./api/contacts"
function App() {
  const [contacts, setContacts] = useState([]);
  const [searchterm, setSearchTerm] = useState("");
  const [searchContacts, setsearchContacts] = useState([]);


  // const contacts = [
  //   {
  //     id: "1",
  //     name: "bipin",
  //     email: "bipin@mail.com"
  //   },
  //   {
  //     id: "2",
  //     name: "john",
  //     email: "john@mail.com"
  //   }
  // ];
  const localKey = "contacts";

  const addContactHandler = async (contact) => {
    const requestData = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", requestData);
    setContacts([...contacts, response.data]);
  }

  const updateContactHandler = async (contact) => {

    const res = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = res.data;
    setContacts(contacts.map(contact => {
      return contact.id == id ? { ...res.data } : contact;
    }))
  }

  const removeHandler = async (id) => {
    const res = await api.delete(`/contacts/${id}`)
    const newCont = contacts.filter((c) => c.id !== id);
    setContacts(newCont);

  }

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  useEffect(() => {
    //const localContacts = JSON.parse(localStorage.getItem(localKey));
    const getContacts = async () => {
      const apicontacts = await retriveContacts();
      if (apicontacts)
        setContacts(apicontacts);
      else
        setContacts(contacts);

    }
    getContacts();
  }, [])

  // useEffect(() => {
  //   // localStorage.setItem(localKey, JSON.stringify(contacts));
  // }, [contacts])

  const searchHandler = (searchterm) => {
    setSearchTerm(searchterm);
    if (searchterm !== "") {
      const newContacts = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchterm.toLowerCase());
      });
      setsearchContacts(newContacts)
    }
    else {
      setsearchContacts(contacts);
    }


  }

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          {/* <Route path="/" exact component={() => <ContactList contacts={contacts} removeHandler={removeHandler} />} />
          <Route path="/add" component={() => <AddContact addContactHandler={addContactHandler} />} /> */}
          <Route path="/" exact render={(props) => (<ContactList {...props} searchterm={searchterm} searchHandler={searchHandler} contacts={searchterm.length < 1 ? contacts : searchContacts} removeHandler={removeHandler} />)} />
          <Route path="/add" exact render={(props) => (<AddContact {...props} addContactHandler={addContactHandler} />)} />
          <Route path="/edit" render={(props) => (<EditContact {...props} updateContactHandler={updateContactHandler} />)} />
          <Route path="/contact/:id" component={ContactDetails} />
        </Switch>
      </Router>
      {/* 
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} removeHandler={removeHandler} /> */}
    </div>
  );
}

export default App;
