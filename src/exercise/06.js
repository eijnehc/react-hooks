// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: STATUS.IDLE,
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: STATUS.PENDING})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status: STATUS.RESOLVED, pokemon})
      },
      error => {
        setState({status: STATUS.REJECTED, error})
      },
    )
  }, [pokemonName])

  if (status === STATUS.IDLE) {
    return 'Submit a pokemon'
  } else if (status === STATUS.RESOLVED) {
    return <PokemonDataView pokemon={pokemon} />
  } else if (status === STATUS.PENDING) {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === STATUS.REJECTED) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
