import * as types from '../constants/actionTypes'

const initialState = {
  info: undefined,
  url: undefined,
}

const media = (state = initialState, action) => {
  switch (action.type) {
    case types.ASK_LOGIN: return loadMedia(action)
    case types.LOAD_MEDIA: return loadMedia(action)
    default: return state
  }
}

const loadMedia = action => ({
  info: action.media,
  url: undefined,
})

export default media