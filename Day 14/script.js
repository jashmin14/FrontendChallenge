const userList = document.getElementById("user-list");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    userList.innerHTML = ""; // Clear the loading text
    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>City:</strong> ${user.address.city}</p>
      `;
      userList.appendChild(userDiv);
    });
  })
  .catch((error) => {
    userList.innerHTML = "Error fetching users.";
    console.error("Error:", error);
  });
