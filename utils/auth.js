import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';

export const signIn = async (username, password) => {
  // const userStore = useUserStore();

  const res = await axios.post('http://localhost:8000/sign-in', { username, password }, { withCredentials: true });
  // userStore.setUser(res.data.user);
  console.log('Signed in with username:', username);

  return res.data.user;
};

export const signOut = async () => {
  // const userStore = useUserStore();

  const res = await axios.post('http://localhost:8000/sign-out', {}, { withCredentials: true });
  // userStore.clearUser();
  console.log('Signed out');
};

export const register = async (username, password, role) => {
  const res = await axios.post('http://localhost:8000/register', { username, password, role }, { withCredentials: true });
  console.log('Registered with username:', username);

  return res.data.user;
};

