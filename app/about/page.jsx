import MouseCursor from '@/components/MouseCursor'
import LandingPageHeader from '@/components/LandingPageHeader'
import { fetchUser } from '@/utils/fetchUser';
const AboutPage = async () => {

  const { user, auth } = await fetchUser();

  return (
      <>
        <MouseCursor />
          <div className="text-sky-100 h-screen w-full flex flex-col relative overflow-hidden">
            <LandingPageHeader user={user} />
              <div className='w-full h-full flex flex-col mt-20'>
                <div className="overflow-hidden relative justify-center items-center text-sky-100 min-h-screen flex flex-col">
                  <div className="flex flex-col w-[80%] max-w-md min-w-xs gap-4 p-8 rounded-2xl shadow-md bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50">
                    <h1 className="text-4xl text-white">About Us</h1>
                    <p className="text-lg text-white">
                      Welcome to our platform! We aim to provide the best user experience with cutting-edge technology.
                    </p>
                    <p className="text-white">
                      Our system is designed to improve efficiency and security using modern web technologies. Stay connected and explore the future with us!
                    </p>
                  </div>
                </div>
              </div>
          </div>
      </>
  )
}

export default AboutPage;