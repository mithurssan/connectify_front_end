import React from 'react'
import * as AiIcons from 'react-icons/ai'
const business_id = localStorage.getItem("business_id")
export const SidebarData = [
  {
    title: 'Dashboard',
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    forBusiness: true
  },

  {
    title: 'My Rota',
    path: '/rota',
    icon: <AiIcons.AiFillCalendar />,
    cName: 'nav-text',
    forBusiness: true
  },

  {
    title: 'Bookings',
    path: '/bookings',
    icon: <AiIcons.AiFillCloud />,
    cName: 'nav-text',
    forBusiness: true
  },

  {
    title: 'Profile',
    path: '/profile',
    icon: <AiIcons.AiFillSmile />,
    cName: 'nav-text',
    show: true,
    forBusiness: true
  },

  {
    title: 'Well-being',
    path: '/wellbeing',
    icon: <AiIcons.AiFillRead />,
    cName: 'nav-text',
    show: true,
    forBusiness: true
  },
]
