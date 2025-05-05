export const loginUser = (user) => {
  return { type: "LOGIN_SUCCESS", payload: user };
};

export const logoutUser = () => {
  return { type: "LOGOUT" };
};