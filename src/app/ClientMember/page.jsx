// we cannot use this in client page we have to do another way
// import { getServerSession } from "next-auth"
// import { options } from "../api/auth/[...nextauth]/options"
"use client"
// we use this way in client site page 
// but in this way we have to use session provider which wrap our app
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation'


// we dont have to use async await here
const ClientMember = () => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/ClientMember');
    }
  })
  return (
    <div>
      <h1>ClientMember</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  )
}

export default ClientMember