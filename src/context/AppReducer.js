export default (state, action) => {
  switch (action.type) {
    case 'CLICKED_METRIC':
      return {
        ...state,
        currentMetric: action.payload,
      };
    default:
      return state;
  }
};
