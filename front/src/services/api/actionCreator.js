import { CALL_API } from './middleware';

export default ({
  endpoint,
  authenticated,
  types,
  method,
  data,
  microservice,
  contentType,
  accept,
}) => {
  return {
    [CALL_API]: {
      endpoint,
      authenticated,
      types,
      method,
      data,
      microservice,
      contentType,
      accept,
    },
  };
};
