export default function Logout() {
    
    localStorage.removeItem('token');
    window.location.replace("/");
}