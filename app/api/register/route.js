export async function POST(req, res) {
    const { email, password } = await req.json();
    console.log("Email:", email);
    console.log("Password:", password);
    res.status(200).json({ message: "User registered successfully!" });
}