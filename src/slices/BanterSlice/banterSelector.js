export const banterDataSelector = (state) => {
  console.log(state, "INSIDE BANTER STATE");
  return state.banterSlice;
};
