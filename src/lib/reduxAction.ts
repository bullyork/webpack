import * as _ from 'lodash';

function noop(payload = {}) {
  return payload;
}

function createAction(type: String, payloadCreator = noop) {
  const fn = (...args) => {
    return (dispatch, getState) => {
      return Promise
        .resolve(payloadCreator.apply({getState}, args))
        .then((payload = {}) => {
          const result = {
            payload,
            type
          };
          dispatch(result);
          return result;
        });
    };
  };
  return fn;
}

function createSyncAction(type: String, payloadCreator = noop) {
  return (...args) => {
    const payload = payloadCreator.apply(args);
    const result = {
      payload,
      type
    };
    return result;
  };
}

/**
 * @param {Object} handlers
 * @param {Object} defaultState
 */

function createReducer(defaultState: Object, handlers: Object) {
  return (state = defaultState, action) => {
    const type = action.type;
    if (!type) {
      return {...state};
    }
    const handler = handlers[type];
    const result = handler(action.payload, state);
    return _.cloneDeep({...state, ...result});
  };
}

export {
  createAction,
  createSyncAction,
  createReducer,
}
