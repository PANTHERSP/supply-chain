import LandingPageHeader from '@/components/LandingPageHeader'
import MouseCursor from '@/components/MouseCursor'
import { fetchUser } from '@/utils/fetchUser';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import SettingsForm from '@/components/SettingsForm';

const SettingsPage = async () => {

  const { user, auth } = await fetchUser();

  return (
    <>
    <MouseCursor />
      
      <div className="text-sky-100 h-screen w-full flex flex-col relative overflow-hidden">
        <LandingPageHeader user={user} />
        <div className='w-full h-full flex flex-col mt-20'>
            
            <SettingsForm user={user} />

        </div>
        
      </div>
    </>
  )
}

export default SettingsPage
