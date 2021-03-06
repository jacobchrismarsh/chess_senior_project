import $ from 'jquery';

export const checkSignedIn = () => {
  return $.ajax({
    url: 'http://127.0.0.1:8000/user/current_user/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('token')}`
    },
    error: () => {
      if (!(['/', '/sign_in', '/create_user'].some(path => 
          (path !== '/' && path.includes(window.location.pathname)) || (path === '/' && path === window.location.pathname)))) {      
        window.location = '/'
      }
    }
  });
}