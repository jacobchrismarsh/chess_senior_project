import $ from 'jquery';

export const checkSignedIn = () => {
  return $.ajax({
    url: 'http://127.0.0.1:8000/user/is_logged_in/',
    method: 'GET'
  });
}