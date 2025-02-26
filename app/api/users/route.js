export async function GET(res, req) {
    res.status(200).json([{ name: 'John Doe' }, { name: 'Jane Doe' }])
}