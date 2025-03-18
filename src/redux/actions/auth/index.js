export const login = (info) => {
  return {
    type: "USER_LOGIN",
    info: info
  }
}

export const logout = () => {
  return {
    type: "USER_LOGOUT",
  }
}

export const addUserToken = (token)=>{
  return {
    type: "ADD_USER_TOKEN",
    accessToken: token.accessToken,
    refreshToken: token.refreshToken
  }
}
