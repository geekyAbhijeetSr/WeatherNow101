import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    setValue = (e) => {

        this.setState({
            value: e.target.value,
        })
    }

    handleChange = (e) => {
        e.preventDefault();
        if (this.state.value) {
            this.props.fetchSearchData(this.state.value);

            this.setState({
                value: "",
            })
        }

    }
    render() {
        return (
            <div className="form-container">
                <div className="form">
                    <form onSubmit={this.handleChange}>
                        <input value={this.state.value} type="text" placeholder="City, Country" onChange={this.setValue} />
                        <button><i className="fas fa-arrow-right"></i></button>
                    </form>
                </div>

            </div>
        );
    }
}

export default Form;
