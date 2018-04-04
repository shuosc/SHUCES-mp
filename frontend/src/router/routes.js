
export default [
  {
    path: '/room-booking',
    component: () => import('layouts/RoomBooking'),
    children: [
      { path: 'new', name: 'booking-order-new', component: () => import('pages/RoomBookingNew') },
      { path: 'history', name: 'booking-order-history', component: () => import('pages/RoomBookingHistory') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
