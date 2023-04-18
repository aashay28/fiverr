export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};
export const getAccessToken = () => {
  return JSON.parse(localStorage.getItem("accessToken"));
};
