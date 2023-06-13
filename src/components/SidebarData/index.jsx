import React from 'react'
import * as AiIcons from 'react-icons/ai'

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },

  {
    title: 'My Rota',
    path: '/rota',
    icon: <AiIcons.AiFillCalendar />,
    cName: 'nav-text',
  },

  {
    title: 'Bookings',
    path: '/bookings',
    icon: <AiIcons.AiFillCloud />,
    cName: 'nav-text',
  },

  {
    title: 'Profile',
    path: '/profile',
    icon: <AiIcons.AiFillSmile />,
    cName: 'nav-text',
  },

  {
    title: 'Well-being',
    path: '/wellbeing',
    icon: <AiIcons.AiFillRead />,
    cName: 'nav-text',
  },
]
