import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
	super(props)
	this.state = { short: '' }

	// Bind events
	this.handleShortInput = this.handleShortInput.bind(this)
	this.handleLongInput = this.handleLongInput.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
    }
    async componentDidMount() {
	const resp = await fetch('/new_url')
	const json = await resp.json()
	
	this.setState(
	    Object.assign(this.state, {placeholder: json.shortUrl, good: true})
	)
    }
    async handleShortInput(ev) {
	this.setState(
	    Object.assign(this.state, {short: ev.target.value
	}))
	
	if(ev.target.value.length === 0) return
	
	const resp = await fetch('/check', {
	    method: 'post',
	    headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({'shortUrl': ev.target.value})
	})
	const json = await resp.json()

	this.setState(Object.assign(this.state, {good: !json.exists}))
    }
    async handleLongInput(ev) {
	this.setState(
	    Object.assign(this.state, {long: ev.target.value
	}))
    }
    async handleSubmit(ev) {
	ev.preventDefault()

	if(!this.state.good) return

	const long = escape(this.state.long)
	const short = this.state.short.length === 0 ?
		      this.state.placeholder :
		      this.state.short

	var params = {shortUrl: short, longUrl: long}
	
	const resp = await fetch('/add', {
	    method: 'post',
	    headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(params)
	})
	const json = await resp.json()
	if(json.success)
	    this.setState(Object.assign(this.state, {added: short + ' => ' + this.state.long}))
    }
    
    render() {
	return (
	    <div className="App">
		<form onSubmit={this.handleSubmit}>
		    <input
			type="text"
			placeholder="Insert your url here."
			name="longUrl"
			onInput={this.handleLongInput}
		    />
		    <input type="submit" value="Shorten!"/>
		    <br />
		    <label htmlFor="shortUrl">lishjs.dy.fi/</label>
		    <input type="text"
			   placeholder={this.state.placeholder}
			   name="shortUrl"
			   onInput={this.handleShortInput}
		    />
		    <br />
		    {this.state.good ? "Yea!" : "Nope"}
		    <br />
		    {this.state.added || ''}
		</form>
	    </div>
	);
    }
}

export default App;
