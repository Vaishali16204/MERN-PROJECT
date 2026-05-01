
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();
  console.log("Logged in:", data);
};