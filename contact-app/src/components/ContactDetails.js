import React from "react";
import { Link } from "react-router-dom";
import usrimg from "../images/user.png";
import faker from "faker"

const ContactDetails = (props) => {
    const { id, name, email } = props.location.state.contact;
    return (
        <div className="item">
            <div>Details: </div>
            <div className="content">
                <img src={faker.image.avatar()}></img>
                <div className="header">
                    {name}
                </div>
                <div>
                    {email}
                </div>
                <Link to="/"><button className="ui button blue">Back to List</button></Link>
                <i className="trash alternate outline icon" style={{ color: "red" }} onClick={() => props.deleteContact(id)}></i>
            </div>
        </div>
    );
}

export default ContactDetails;