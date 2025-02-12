import { Session } from 'next-auth'
import React from 'react'

const Header = ({session}:{session:Session}) => {
  return (
    <header className='admin-header'>
        <main>
            <h2 className='text-dark-400 font-semibold text-2xl '>
                {session?.user?.name}
            </h2>
            <p className='tet-slate-500 text-base'>
                Monitor all your books here
            </p>
        </main>
        {/* Search bar */}
    </header>
  )
}

export default Header