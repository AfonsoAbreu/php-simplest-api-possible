function check (label, input) {
  if (input.value.length === 0) {
    label.classList.remove("top");
  } else {
    label.classList.add("top");
  }
}

export default function labelFloat () {
  const inputs =  document.querySelectorAll(".label-float input");
  const labels =  document.querySelectorAll(".label-float label");
  for (let i = 0; i < inputs.length; i++) {
    sync(labels[i], inputs[i]);
  }
  return inputs;
}

function sync (label, input) {
  check(label, input);
  input.addEventListener("blur", function () {check(label, input)}, false);
}
