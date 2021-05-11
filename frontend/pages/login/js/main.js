import labelFloat from "../../../public/js/labelFloat.js";

const inputs = [...labelFloat()];

const signIn = document.getElementById("signIn");
signIn.addEventListener("click", async () => {
  const success = await tryLogin("./api/user", "POST", {
    email: inputs[0].value,
    password: inputs[1].value
  });
  if (success) {
    window.location = "gerenciar-itens";
  } else {
    const err = document.getElementById("err");
    err.textContent = "Dados Inválidos";
  }
});

async function tryLogin (route, method, body = {}) {
  const reqData = {
    method,
    credentials: "include",
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
  };
  if (method === "PUT" || method === "POST" || method === "PATCH") {
    reqData.body = JSON.stringify(body);
  }
  const response = await fetch(
    route, 
    reqData
  );
  
  return (response.status === 200);
}

window.onload = async () => {
  const success = await tryLogin("./api/user", "GET");
  if (success) {
    window.location = "gerenciar-itens";
  }
}