import { samplebooks } from '@/app/constants'
import { signOut } from '@/auth'
import BookList from '@/components/BookList'
import { Button } from '@/components/ui/button'
import React from 'react'

const Page = () => {
  return (
    <div>
      <form action={
        async()=>{
          "use server"
          await signOut()

        }
      }>
        <Button>Log out</Button>
      </form>
      <BookList title={"Borrowed Books"} books={samplebooks}/>
    </div>
  )
}

export default Page