import * as types from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  date: null,
  items: []
}

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_GAMES: return requestGames(state, action)
    case types.RECEIVE_GAMES: return receiveGames(state, action)
    default: return state
  }
}

const requestGames = (state, action) => ({
  ...state,
  isFetching: true,
  date: action.date
})

const receiveGames = (state, action) => ({
  ...state,
  isFetching: false,
  items: action.games
})

export default gamesReducer