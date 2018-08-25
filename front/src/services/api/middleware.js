const DOMAIN = 'localhost';
const PROTOCOL = 'http://';
export const BASE_URL = PROTOCOL + DOMAIN;

const addTokenIfIsAuthenticated = (authenticated, token, config) => {
  if (!authenticated) {
    return config;
  }
  if (token) {
    config.headers['Authorization'] = token;
    return config;
  }
  throw new Error('NO_TOKEN_SAVED');
};
const addBody = (data, configWithHeaders) => {
  if (!data) {
    return configWithHeaders;
  }
  if (configWithHeaders.headers['content-type'] === 'multipart/form-data') {
    delete configWithHeaders.headers['content-type'];
    delete configWithHeaders.headers['Accept'];
    return {
      ...configWithHeaders,
      body: data,
    };
  }
  return {
    ...configWithHeaders,
    body: JSON.stringify(data),
  };
};

async function callApi({
  endpoint,
  authenticated,
  method,
  data,
  token,
  contentType = 'application/json',
  accept = 'application/json',
}) {
  const headers = {
    'content-type': contentType,
    Accept: accept,
  };
  const configWithHeaders = addTokenIfIsAuthenticated(authenticated, token, {
    method,
    headers,
  });
  const config = addBody(data, configWithHeaders);

  let response = null;
  try {
    response = await fetch(BASE_URL + endpoint, config);
  } catch (e) {
    return Promise.reject({ data: e.message });
  }

  if (!response.ok) {
    const json = await response.json();
    return Promise.reject({ status: response.status, data: json });
  }
  let json = null;
  if (response.status === 204) {
    return '';
  }
  try {
    if (accept !== 'application/json') {
      return await response.blob();
    }
    json = await response.json();
  } catch (e) {
    return Promise.reject(e.message);
  }
  return json;
}

const getToken = (authenticated, store) => {
  const { security } = store.getState();
  if (!authenticated || !security) {
    return null;
  }
  const { impersonate } = security;
  if (!!impersonate) {
    return impersonate.accessToken;
  }
  return security.token;
};

const getRefreshTokenForImpersonate = store => {
  const { security } = store.getState();
  if (!security) {
    return null;
  }
  const { impersonate } = security;
  if (!!impersonate) {
    return impersonate.refreshToken;
  }
  return null;
};

const getRefreshToken = store => {
  const { security } = store.getState();
  if (!security) {
    return null;
  }
  return security.refreshToken;
};

export const CALL_API = 'CALL_API';

const executeActionsResponse = (next, response, types) => {
  const actionTypes = [].concat(types);
  actionTypes.forEach(actionType => {
    if (typeof actionType === 'function') {
      const { type, ...extras } = actionType(response);
      return next({ response, ...extras, type });
    }

    if (typeof actionType === 'object') {
      return next({ response, ...actionType });
    }

    return next({
      response,
      type: actionType,
    });
  });
};

const executeActionsError = (next, error, types) => {
  console.log(error);
  const actionTypes = [].concat(types);

  actionTypes.forEach(actionType => {
    if (typeof actionType === 'function') {
      const { type, ...extras } = actionType(error);
      return next({ error, ...extras, type });
    }

    if (typeof actionType === 'object') {
      return next({ error, ...actionType });
    }

    return next({
      error,
      type: actionType,
    });
  });
};

export default store => next => action => {
  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  const {
    endpoint,
    types,
    authenticated,
    method,
    data,
    contentType,
    accept,
  } = callAPI;

  const [requestType, successTypes, errorTypes] = types;

  if (typeof requestType === 'object') {
    next(requestType);
  } else {
    next({
      type: requestType,
    });
  }

  const token = getToken(authenticated, store);
  const refreshToken = getRefreshToken(store);
  const refreshTokenForImpersonate = getRefreshTokenForImpersonate(store);

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi({
    endpoint,
    authenticated,
    method,
    data,
    token,
    refreshToken,
    refreshTokenForImpersonate,
    next,
    contentType,
    accept,
  })
    .then(response => {
      return executeActionsResponse(next, response, successTypes);
    })
    .catch(error => {
      return executeActionsError(next, error, errorTypes);
    });
};
