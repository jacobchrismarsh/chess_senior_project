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
      debugger;
      if (!(['/', '/sign_in', '/sign_in/', '/create_user', '/create_user/'].some(path => path === window.location.pathname))) {        
        window.location = '/'
      }
    }
  });
}