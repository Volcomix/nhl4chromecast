import * as types from '../constants/actionTypes'

export const fetchGames = date => async dispatch => {
  dispatch(requestGames(date))
  const hostname = 'statsapi.web.nhl.com'
  const dateParam = `date=${date.format('YYYY-MM-DD')}`
  const expandParam = 'expand=schedule.game.content.media.epg'
  const url = `http://${hostname}/api/v1/schedule?${dateParam}&${expandParam}`
  try {
    const response = await fetch(url)
    const json = await response.json()
    dispatch(receiveGames(date, json))
  } catch (error) {
    console.error(error)
  }
}

export const requestGames = date => ({
  type: types.REQUEST_GAMES,
  date
})

export const receiveGames = (date, json) => ({
  type: types.RECEIVE_GAMES,
  games: json.dates ? json.dates[0].games : []
})