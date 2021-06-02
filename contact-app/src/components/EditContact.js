import React from "react";

class EditContact extends React.Component {

    constructor(props) {
        super(props)
        const { id, name, email } = props.location.state.contact;
        this.state = {
            id,
            name,
            email
        }
    }

    edit = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert(" All feilds are required");
            return;
        }
        this.props.updateContactHandler(this.state);
        this.setState({ name: "", email: "" });
        // console.log('the values are ', this.state.email, this.state.name);
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.edit}>
                    <div>
                        <label>
                            Name
                        </label>
                        <input type="text" name="name" placeholder="Name Placeholder" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}></input>
                    </div>
                    <div>
                        <label>
                            Email
                        </label>
                        <input type="text" name="email" placeholder="Email Placeholder" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}></input>
                    </div>
                    <button className="ui button blue" >Update </button>
                </form>

            </div>

        );
    }

}

export default EditContact;