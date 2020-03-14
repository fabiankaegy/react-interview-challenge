import React, { useEffect, useState } from 'react';

// api
import { PeopleApi } from './services/PeopleApi.js';

// style
import './App.css';


export default props => {

	const [ people, setPeople ] = useState( [] );
	const [ filter, setFilter ] = useState();

	useEffect( () => {
		fetchPeople();
	}, [])


	const fetchPeople = async () => {
		try {
			const response = await PeopleApi.getPeople();
			setPeople( response );
		} catch (error) {
			console.error(error);
		}
	}

	const handleChange = (val) => {
		setFilter( val );
	}

	const renderPeople = () => {
		if( people && people.length ) {
			return people.map( Card );
		}

		return null;
	}

	return (
		<div>
			<select onChange={(val) => handleChange(val)}>
					<option>No Filter</option>
					<option>Male</option>
					<option>Female</option>
			</select>

			{ renderPeople() }
		</div>
	);

}

const Card = props => {
	const { picture: { medium }, name: { first, last } } = props;

	return (
		<div>
			<img src={ medium } alt="" />
			<div>
				{ `${ first } ${ last }` }
			</div>
		</div>
	)
}