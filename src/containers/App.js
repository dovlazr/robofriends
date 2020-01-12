import React, { Component } from 'react';
import CardList from '../components/CardList';
// import {robots} from './robots';  {robots} mora se uraditi 'destructure' zato sto robots.js nije default.
// Ispalo je da imam samo jedan objekat ali posto nije default mora se uraditi {}.
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import '../index.css'; 

class App extends Component{
	constructor(){
			super();
			this.state={
				robots: [],
				searchfield: ''
			}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }))
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render(){
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		 return !this.state.robots.length ? <h1>Loading...</h1> :
	        (
				<div className='tc'> 
						<h1 className='f1'>RoboFriends</h1>
						<SearchBox searchChange={this.onSearchChange}/>
						<Scroll>
							<CardList robots={filteredRobots}/>
				 		</Scroll>
				 	</div>	
			);	
	}	
}

export default App;