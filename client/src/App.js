import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
	super(props)
	this.state = {}

	// Bind events
	this.handleInput = this.handleInput.bind(this)
    }
    async componentDidMount() {
	const resp = await fetch('/new_url')
	const json = await resp.json()
	
	this.setState({placeholder: json.shortUrl, good: true})
    }
    async handleInput(ev) {
	ev.preventDefault()
	
	const resp = await fetch('/check', {
	    method: 'post',
	    headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({'shortUrl': ev.target.value})
	})
	const json = await resp.json()

	console.log(json)
	this.setState(Object.assign(this.state, {good: !json.exists}))
    }
    render() {
	return (
	    <div className="App">
		<form onSubmit={this.handleSubmit}>
		    <input
			type="text"
			placeholder="Insert your url here."
			name="longUrl"
		    />
		    <input type="submit" value="Shorten!"/>
		    <br />
		    <label htmlFor="shortUrl">lishjs.dy.fi/</label>
		    <input type="text"
			   placeholder={this.state.placeholder}
			   name="shortUrl"
			   onInput={this.handleInput}
		    />
		    {this.state.good ? "Yea!" : "Nope"}
		</form>
	    </div>
	);
    }
}

export default App;
