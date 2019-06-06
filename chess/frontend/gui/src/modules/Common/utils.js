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
      if (!window.location.pathname === '/' && !window.location.pathname.includes('sign_in')) {
        window.location = '/sign_in'
      }
    }
  });
}