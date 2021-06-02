import React from "react";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
    const { id, name, email } = props.contact;
    console.log('aaaaaaaaaaaaaaaa', props);

    return (
        <div className="item">
            <div className="content">
                <Link to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}>
                    <div className="header">
                        {name}
                    </div>
                    <div>
                        {email}
                    </div>
                </Link>
                <i className="trash alternate outline icon" style={{ color: "red" }} onClick={() => props.deleteContact(id)}></i>
                <Link to={{ pathname: `/edit`, state: { contact: props.contact } }}>
                    <i className="edit alternate outline icon" style={{ color: "blue" }}></i>
                </Link>
            </div>
        </div>
    );
}

export default ContactCard;