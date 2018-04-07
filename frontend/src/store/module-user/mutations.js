export const updateUser = (state, payload) => {
  state.id = payload.id
  state.avatar = payload.avatar
  state.password = payload.password
  state.name = payload.name
}
