const home = {
  path: '/',
  name: 'home',
  component: () => import('@/views/Home'),
  redirect: '/films',
  children: [
    {
      path: 'films',
      name: 'films',
      component: () => import('@/views/Home/Films')
    },
    {
      path: 'cinemas',
      name: 'cinemas',
      component: () => import('@/views/Home/Cinemas')
    },
    {
      path: 'center',
      name: 'center',
      component: () => import('@/views/Home/Center')
    }
  ]
}

export default home
