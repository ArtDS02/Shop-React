import Cookies from 'universal-cookie';
const cookies = new Cookies()
const expires = new Date();
expires.setHours(expires.getHours() + 24);

export function SaveCookie(key, value) {
    cookies.set(key, value, { expires });
}

export function GetCookie(key) {
  return cookies.get(key); // Thêm lệnh return để trả về giá trị của cookie
}

