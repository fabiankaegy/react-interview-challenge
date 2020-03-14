import axios from 'axios';

export const PeopleApi = {
    getPeople() {
        return (
            axios( {
                method: 'get',
                url: 'https://randomuser.me/api/?results=6'
            } )
            .then( response => {
                return response.data.results;
            })
            .catch( error => {
                return error;
            })
        );
    }
}