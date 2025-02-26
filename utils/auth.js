import axios from 'axios';

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await axios.get('http://localhost:8000/check-session', { withCredentials: true });
//       setUser(res.data);
//       setLoading(false);
//     };
//     fetchUser();
//   }, []);

const signIn = async (username, password) => {
  const res = await axios.post('http://localhost:8000/sign-in', { username, password }, { withCredentials: true });
  console.log('Signed in with username:', username);
};

const signOut = async () => {
  await axios.post('http://localhost:8000/sign-out', {}, { withCredentials: true });
  console.log('Signed out');
};

export { signIn, signOut };
