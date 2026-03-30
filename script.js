async function sendPrompt(prompt) {
  const res = await fetch("/api/generate", {
    method: "POST",
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();

  const result = data.choices?.[0]?.message?.content;

  console.log(result);

  document.getElementById("output").innerText = result;
}
