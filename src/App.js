import React, { useEffect, useState } from 'react';

// api
import { PeopleApi } from './services/PeopleApi.js';
import background from './images/background.jpg';

// style
import './App.css';


export default () => {

	// setup local states
	const [ people, setPeople ] = useState( [] );
	const [ filter, setFilter ] = useState( '' );
	const [ isLoading, setIsLoading ] = useState( false );

	/**
	 * fetches 6 new people from the API
	 * 
	 * @return {Array} array of 6 new people from the API
	 */
	const fetchPeople = async () => {
		try {
			return await PeopleApi.getPeople();
		} catch ( error ) {
			console.error( error );
		}
	};

	/**
	 * click handler for the Load more button
	 */
	const handleLoadMore = async () => {
		setIsLoading( true );
		const result = await fetchPeople();
		setPeople( [...people,...result] );
		setIsLoading( false );
	}

	// automatically pull in people every 5 secconds

	// useEffect( () => {
	// 	setInterval( () => {
	// 		handleLoadMore()
	// 	}, 5000 )

	// }, [handleLoadMore] )

	/**
	 * Remove Person
	 * @param {Number} atIndex removes person at the provided index
	 */
	const removePerson = ( uuid ) => {

		// filter wether the provided index matches the index of the person
		const newPeople = people.filter( person => {			
			return ! (person.login.uuid === uuid);
		});

		setPeople( newPeople );
	}

	// load the initial 6 people
	useEffect( () => {
		( async () => {
			setIsLoading( true );
			const result = await fetchPeople();
			setPeople( result );
			setIsLoading( false );
		} )()
	}, []);

	/**
	 * Handler for selecting an item in the Gender Filter
	 * @param {*} event 
	 */
	const handleChange = event => {
		setFilter( event.target.value );
	}

	/**
	 * Checks wether the provided gender matches the current filter
	 * @param {Object} person 
	 */
	const isGender = person => {
		// return true when no filter is applied
		if ( ! filter ) {
			return true;
		}
		return person.gender === filter;
	}

	return (
		<div className="wrapper">
			<h1>Contact List:</h1>
			<label htmlFor="select-gender">Geschlecht:</label>
			<select id="select-gender" onChange={ event => handleChange( event )}>
					<option value="">No Filter</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
			</select>
			<div className="people-grid">
				{ people && people.length ? (
					people
					.filter( isGender )
					.map( ( person, key ) => ( 
						<Card key={ key } { ...person } removePerson={ removePerson } />
					) ) 
				) : null }
			</div>
			<button className={ `load-more ${ isLoading ? 'is-busy' : '' }` } onClick={ handleLoadMore }>Load More</button>
		</div>
	);

}

const Card = props => {
	const { 
		picture: { 
			large
		}, 
		name: { 
			first,
			last
		}, 
		gender, 
		email, 
		removePerson,
		login: {
			uuid
		} 
	} = props;

	return (
		<div className="card">
			<button className="delete" onClick={ () => removePerson( uuid ) } >X</button>
			<img className="background" src={background} alt="" />
			<div className="container">
				<img className="avatar" src={ large } alt="" />
				<h2>{ `${ first } ${ last }` }</h2>
				<h4>{ gender }</h4>
				<a className="button" href={`mailto:${email}`}>Connect</a>
			</div>
		</div>
	)
}