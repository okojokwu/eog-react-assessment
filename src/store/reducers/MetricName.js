import * as actions from '../actions';

const initialState = {
  metricNames: 'injValveOpen',
};

const dataNameUpdated = (state, action) => {
  return {
    metricNames: action.metricNames,
  };
};

const handlers = {
  [actions.DATA_NAME_UPDATED]: dataNameUpdated,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
