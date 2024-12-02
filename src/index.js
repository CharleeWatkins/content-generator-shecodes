async function generateContent(event) {
  event.preventDefault();

  const instructionsInput = document.querySelector("#user-instructions");
  const contentType = document.querySelector("#content-type").value;
  const topic = instructionsInput.value.trim();

  if (!topic) {
    alert("Please enter a topic!");
    return;
  }

  const contentDiv = document.getElementById('content');
  contentDiv.classList.remove("hidden");
  contentDiv.innerHTML = `<div class="generating">⏳ Generating ${contentType} about "${topic}"...</div>`;

  const apiKey = "2t5o813b3caa04b3457d8dcba10d7a3f"; // Replace with your actual API key
  let prompt = "";

  // Set up prompts based on content type
  switch (contentType) {
    case 'poem':
      prompt = `Write a French poem about ${topic}`;
      break;
    case 'joke':
      prompt = `Tell a funny joke about ${topic}`;
      break;
    case 'recipe':
      prompt = `Give a recipe for a dish with ${topic}`;
      break;
    case 'quote':
      prompt = `Give me a motivational quote about ${topic}`;
      break;
    case 'destination':
      prompt = `Suggest a travel destination related to ${topic}`;
      break;
    case 'baby-name':
      prompt = `Suggest a unique baby name inspired by ${topic}`;
      break;
    default:
      prompt = `Generate content about ${topic}`;
  }

  const apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&key=${apiKey}`;

  try {
    const response = await axios.get(apiURL);
    displayContent(response, contentType);
  } catch (error) {
    console.error("Error generating content:", error);
    contentDiv.innerHTML = "Sorry, there was an error generating content. Please try again later.";
  }
}

function displayContent(response, contentType) {
  const contentDiv = document.getElementById("content");
  let content = response.data.answer || "No content generated.";

  new Typewriter("#content", {
    strings: [content],
    autoStart: true,
    delay: 50,
    cursor: "|",
  });
}

let contentFormElement = document.querySelector("#content-generator-form");
contentFormElement.addEventListener("submit", generateContent);
