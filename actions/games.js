import * as types from '../constants/actionTypes'

export const fetchGames = date => dispatch => {
  dispatch(requestGames(date))
  const formattedDate = date.format('YYYY-MM-DD')
  const url = `http://statsapi.web.nhl.com/api/v1/schedule?date=${formattedDate}`
  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveGames(date, json)))
    .catch(error => console.error(error))
}

export const requestGames = date => ({
  type: types.REQUEST_GAMES,
  date
})

export const receiveGames = (date, json) => ({
  type: types.RECEIVE_GAMES,
  games: json.dates ? json.dates[0].games : []
})