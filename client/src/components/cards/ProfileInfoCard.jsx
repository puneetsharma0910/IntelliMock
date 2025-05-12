// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../contexts/UserContext';

// const ProfileInfoCard = () => {
//     const {user, clearUser} = useContext(UserContext);
//     const  navigate = useNavigate();
//     const handleLogout = () => {
//         localStorage.clear("token");
//         clearUser();
//         navigate("/");
//     }
//   return (
//     <div className='flex items-center'>
//       <img 
//       width={30}
//       height={30}
//       className='text-[15px] text-black font-bold leading-3'
//       src={user.profileImageUrl} alt="" />
//       <div>
//         <div>
//             {user.name || ""}
//         </div>
//         <button 
//         className='text-amber-600 text-sm font-semibold cursor-pointer hover:underline'
//         onClick={handleLogout}>
//             Logout
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ProfileInfoCard

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-2 py-1 px-3 border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow bg-white">
      <img
        width={32}
        height={32}
        className="rounded-full object-cover border-2 border-amber-500"
        src={user.profileImageUrl}
        alt={`${user.name || 'User'}'s profile`}
      />
      <div className="flex flex-col">
        <div className="text-sm font-medium">
          {user.name || ""}
        </div>
        <button
          className="text-amber-600 text-xs font-semibold cursor-pointer hover:underline text-left leading-tight"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;