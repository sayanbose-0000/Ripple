const signup = (req, res) => {
  const { email, username, password } = req.body;
  const dp = req.file;

  if (!email || !username || !password || !dp) {
    res.status(400).json({ message: "Username, email, password and dp required!" });
    return;
  }
}

export { signup };