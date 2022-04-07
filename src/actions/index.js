// Coloque aqui suas actions
export const NEW_USER = 'NEW_USER';

export const userAction = (email) => ({
  type: NEW_USER,
  email,
});
