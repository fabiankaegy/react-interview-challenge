import React, { useEffect, useState } from 'react';

// api
import { PeopleApi } from './services/PeopleApi.js';
import background from './images/background.jpg';

// style
import './App.css';


export default () => {

	const [ people, setPeople ] = useState( [] );
	const [ filter, setFilter ] = useState( '' );
	const [ isLoading, setIsLoading ] = useState( false );

	const fetchPeople = async () => {
		try {
			return await PeopleApi.getPeople();
		} catch ( error ) {
			console.error( error );
		}
	};

	const handleLoadMore = async () => {
		setIsLoading( true );
		const result = await fetchPeople();
		setPeople( [...people,...result] );
		setIsLoading( false );
	}

	const removePerson = ( id ) => {

		const newPeople = people.filter( (person, key) => {			
			return ! (key === id);
		});

		setPeople( newPeople );
	}

	useEffect( () => {
		( async () => {
			setIsLoading( true );
			const result = await fetchPeople();
			setPeople( result );
			setIsLoading( false );
		} )()
	}, []);

	const handleChange = event => {
		setFilter( event.target.value );
	}

	const isGender = person => {
		if ( ! filter ) {
			return true;
		}
		return person.gender === filter;
	}

	const renderPeople = () => {
		if( people && people.length ) {
			return people
				.filter( isGender )
				.map( ( person, key ) => ( 
					<Card key={ key } { ...person } id={key} removePerson={ removePerson } />
				) );
		}

		return null;
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
				{ renderPeople() }
			</div>
			<button className={ `load-more ${ isLoading ? 'is-busy' : '' }` } onClick={ handleLoadMore }>Load More</button>
		</div>
	);

}

const Card = props => {
	const { picture: { large }, name: { first, last }, gender, email, id, removePerson } = props;

	return (
		<div className="card">
			<button className="delete" onClick={ () => removePerson( id ) } >X</button>
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