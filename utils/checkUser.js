import { redirect } from "next/navigation";
import { signOut } from "./auth";
import { fetchUser } from "./fetchUser";

export const checkUser = async () => {
    const { user, auth } = await fetchUser();
    if (!user || !auth) {
        await signOut();
        return redirect('/sign-in');
    }
    return { user, auth };
}
