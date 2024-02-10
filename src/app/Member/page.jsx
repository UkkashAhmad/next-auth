// protecet the route like this in server side
//we have to use async await in server site
import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
const Member = async () => {
  const session = await getServerSession(options);

  if(!session){
    redirect('/api/auth/signin?callbackUrl=/Member')
  }
  return (
    <div>
      <h1>Member area</h1>
      <p> {session?.user?.email} </p>
      <p> {session?.user?.role} </p>
    </div>
  )
}

export default Member