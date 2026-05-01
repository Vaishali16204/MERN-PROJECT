
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async () => {
  const res = await fetch("http://localhost:5000/login", {
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