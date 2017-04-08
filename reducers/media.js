import * as types from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  info: undefined,
  url: undefined,
}

const media = (state = initialState, action) => {
  switch (action.type) {
    case types.ASK_LOGIN: return initMedia(state, action)
    case types.REQUEST_MEDIA_URL: return requestMediaUrl(state, action)
    case types.RECEIVE_MEDIA_URL: return receiveMediaUrl(state, action)
    default: return state
  }
}

const initMedia = (state, action) => ({
  ...state,
  info: action.media,
  url: undefined,
})

const requestMediaUrl = (state, action) => ({
  isFetching: true,
  info: action.media,
  url: undefined,
})

const receiveMediaUrl = (state, action) => ({
  ...state,
  isFetching: false,
  url: action.url,
})

export default media