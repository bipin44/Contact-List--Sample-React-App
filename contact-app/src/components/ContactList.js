import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
    console.log(props);
    const inputEl = useRef("");
    const deleteContact = (id) => {
        props.removeHandler(id);
    }

    // const contacts = [
    //     {
    //         id: "1",
    //         name: "bipin",
    //         email: "bipin@mail.com"
    //     },
    //     {
    //         id: "2",
    //         name: "john",
    //         email: "john@mail.com"
    //     }
    // ];
    const renderContacts = props.contacts.map((contact) => {
        return (

            <ContactCard contact={contact} deleteContact={deleteContact} />

        );
    });

    const getSearchTerms = () => {
        console.log(" the typing is ", inputEl.current.value);
        props.searchHandler(inputEl.current.value);
    }
    return (
        <div className="main">
            <h2>Contact List</h2>
            <Link to="/add">
                <button className="ui button blue right">Add Contact</button>
            </Link>
            <div className="ui search">
                <input ref={inputEl} type="text" placeholder="Search Contacts" value={props.term} onChange={getSearchTerms}></input>
                <i className="search icon"></i>

            </div>
            <div className="ui celled list">
                {renderContacts}
            </div>
        </div>
    );
}

export default ContactList;