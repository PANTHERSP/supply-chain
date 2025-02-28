import { cookies } from "next/headers";
import axios from "axios";


export const fetchUser = async () => {
    const cookieStore = await cookies();

    console.log('cookie', cookieStore.toString());
  
    const res = await axios.get('http://localhost:8000/check-session', { 
        withCredentials: true, 
        headers: { 
        cookie: cookieStore.toString() 
      } 
    });
    
    const { user, auth } = res.data;
    console.log(user, auth);
    
    
    // if (!user) {
    //     userStore.clearUser();
    //     router.push('/sign-in');
    //     return { user: null, auth: false };
    // }
    
    // userStore.setUser(user);
    
    return { user, auth };
  
}
