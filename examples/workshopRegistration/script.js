const form = document.getElementById("registrationForm");
const loadButton = document.getElementById("loadUsers");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const ageText = document.getElementById("age").value.trim();
  const age = Number(ageText);
  let valid = true;

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("ageError").textContent = "";
  document.getElementById("message").textContent = "";

  if (name === "") {
    document.getElementById("nameError").textContent = "Name is required.";
    valid = false;
  }

  if (email === "" || !email.includes("@") || !email.includes(".")) {
    document.getElementById("emailError").textContent = "Enter a valid email.";
    valid = false;
  }

  if (ageText === "" || !Number.isInteger(age) || age < 18 || age > 60) {
    document.getElementById("ageError").textContent = "Age must be between 18 and 60.";
    valid = false;
  }

  if (valid) {
    document.getElementById("message").textContent =
      "Registration successful! Welcome, " + name + ".";
    form.reset();
  }
});

loadButton.addEventListener("click", async function () {
  const list = document.getElementById("usersList");
  const message = document.getElementById("apiMessage");
  list.innerHTML = "";
  message.textContent = "Loading sample users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const users = await response.json();
    message.textContent = "Sample users loaded:";

    for (const user of users) {
      const item = document.createElement("li");
      item.textContent = user.name + " — " + user.email;
      list.appendChild(item);
    }
  } catch (error) {
    message.textContent = "Could not load users. Check your internet connection.";
    console.log(error);
  }
});
