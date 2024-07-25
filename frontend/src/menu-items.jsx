const menuItems = {
  items: [
    {
      id: 'navigation',
      title: '',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard'
        },
        {
          id: 'reserPassword',
          title: 'Change Password',
          type: 'item',
          icon: 'feather icon-lock',
          url: '/change_password'
        },        {
          id: 'logout',
          title: 'Logout',
          type: 'item',
          icon: 'feather icon-log-out',
          url: '/logout'
        }
      ]
    }
  ]
};

export default menuItems;
