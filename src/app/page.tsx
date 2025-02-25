import { getCurrentSession } from "@/actions/auth";

const HOME = async () => {
  const {user} = await getCurrentSession()
  return (
    <div className='text-black'>
      {JSON.stringify(user)}
    </div>
  );
};

export default HOME;