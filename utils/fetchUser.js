export const fetchUser = async () => {
  const cookieStore = await cookies();

  const res = await axios.get('http://localhost:8000/check-session', { 
    withCredentials: true, 
    headers: { 
    cookie: cookieStore.toString() 
  } 
  });
  
  const { user, auth } = res.data;
  console.log(user, auth);

  return { user, auth };
}
