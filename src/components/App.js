import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateFilters = (newFilters) => {
    this.setState({ filters: {type: newFilters} })
    // this.setState(state => {
    //   state.filters = newFilters
    //   return state
    // }
  }

  fetchPets = () => {
    let type = this.state.filters.type
    fetch(`/api/pets${ type != 'all' ? `?type=${type}` : ''}`)
      .then(resp=>resp.json())
      .then((pets)=>{
        this.setState({ pets: pets })
      })
  }

  adoptPet = (petID) => {
    console.log('adopt',petID)
    this.setState(state => {
      let pet = state.pets.find (pet => pet.id == petID)
      pet.isAdopted = true
      return state
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onFindPetsClick={this.fetchPets} 
              onChangeType={this.updateFilters} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
