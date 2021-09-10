// async function loginFormHandler(event) {
//   event.preventDefault();

//   const username = document.querySelector("#username-input-login").value.trim();
//   const password = document.querySelector("#password-input-login").value.trim();

//   if (username && password) {
//     console.log(username, password);
//     debugger;
//     const response = await fetch("/api/users/login", {
//       method: "POST",
//       body: JSON.stringify({
//         username,
//         password: password
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     if (response.ok) {
//       document.location.replace("/dashboard");
//     } else {
//       alert(response.statusText);
//     }
//   }
// }
// document.addEventListener('submit', loginFormHandler);



