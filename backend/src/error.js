export default function sendError (res) {
    res.status(401)
    res.send('Unauthorized')
}