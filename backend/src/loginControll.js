export default function loginControll (data) {
    if (data.user === 'admin' && data.password === 'Admin123') return true
    return false
}