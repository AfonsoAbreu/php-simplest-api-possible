import labelFloat from "../../../public/js/labelFloat.js";

const inputs = [...labelFloat()];

const signIn = document.getElementById("signIn");
signIn.addEventListener("click", async function () {
  const response = await fetch(
    "./api/user", 
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        email: inputs[0].value,
        password: inputs[1].value
      })
    }
  );

  if (response.status !== 200) {
    const err = document.getElementById("err");
    err.textContent = "Dados Inválidos";
  } else {
    window.location = "gerenciar-itens";
  }
});