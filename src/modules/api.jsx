import { baseUrl } from '../const/index';

const postApi = async (action, data) => {
  const response = await fetch(`${baseUrl}/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

const getApi = async (action, data = {}) => {
  const response = await fetch(`${baseUrl}/${action}?${data}`);
  return await response.json();
};

export const loginAuth = async (payload) => await postApi('auth', payload);
export const registerAuth = async (payload) =>
  await postApi('register', payload);
export const putCard = async (payload) => await postApi('card', payload);
export const getCard = async (payload) =>
  await getApi('card', `token=${payload}`);
export const getAddressList = async () => await getApi('addressList');
export const getRoute = async ({ address1, address2 }) => {
  return await getApi('route', `address1=${address1}&address2=${address2}`);
};
