// import React from 'react'
// import { Link } from 'react-router-dom'
// import ProfileInfoCard from '../cards/ProfileInfoCard'

// const Navbar = () => {
//   return (
//     <div className='h-16 bg-white border border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30 '>
//       <div className='container mx-auto flex items-center justify-between gap-5'>
//         <Link to="/dashboard">
//         <h2 className='text-lg md:text-xl font-medium text-black leading-5'>
// IntelliMock
//         </h2>
//         </Link>
//         <ProfileInfoCard/>
//       </div>
      
//     </div>
//   )
// }

// export default Navbar

import React from 'react'
import { Link } from 'react-router-dom'
import ProfileInfoCard from '../cards/ProfileInfoCard'

const Navbar = () => {
  return (
    <nav className="h-16 bg-white/90 border-b border-orange-200 backdrop-blur-lg shadow-md sticky top-0 z-50 transition-all">
      <div className="container mx-auto flex items-center justify-between gap-6 h-full px-6 md:px-0">
        {/* Logo/Brand */}
        <Link to="/dashboard" className="flex items-center gap-3 group select-none">
          <span className="inline-block text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent transition-all group-hover:from-orange-600 group-hover:to-yellow-500">
            IntelliMock
          </span>
        </Link>
        {/* Profile Card */}
        <ProfileInfoCard />
      </div>
    </nav>
  )
}

export default Navbar
