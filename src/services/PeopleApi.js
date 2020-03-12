import axios from 'axios';

export const PeopleApi = {
    getPeople() {
        return (
            axios({
                method: 'get',
                url: 'https://randomuser.me/api/?results=5'
            })
            .then((res) => {
                return res.data.results;
            })
            .catch((err) => {
                return err;
            })
        );
    }
}