import React from 'react';

// api
import { PeopleApi } from './services/PeopleApi.js';

// style
import styled from 'styled-components';
import './App.css';

const SelectContainer = styled.select`
  width: 160px;
  height: 30px;
`

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      people: [],
    }
  }

  componentDidMount = () => {
    this.fetchPeople();
  }

  fetchPeople = async () => {
    try {
      const res = await PeopleApi.getPeople();
      this.setState({
        people: res
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleChange = (val) => {

  }

  renderPeople = () => {
    if(this.state.people) {
      return this.state.people.map((person) => (
          <div>
            <img src={person.picture.medium} alt=""/>
            <div>
              { `${person.name.first} ${person.name.last}` }
            </div>
          </div>
      ));
    }

    return null;
  }

  render = () => {
    return (
      <div>
        <SelectContainer onChange={(val) => this.handleChange(val)}>
            <option>No Filter</option>
            <option>Male</option>
            <option>Female</option>
        </SelectContainer>

        { this.renderPeople() }
      </div>
    );
  }

}