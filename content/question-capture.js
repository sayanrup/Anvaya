// content/question-capture.js — the 15-second intent capture, shown only
// to genuinely ambiguous visitors (source=assistant or intent=unknown).
const CONTENT_QUESTION_CAPTURE = {
  questionCapture: {
    prompt: "What brought you here today?",
    options: [
      { label: "How much will my home cost?", routeIntent: "3bhk_cost" },
      { label: "How is Anvaya different?",    routeIntent: "vs_competitor" },
      { label: "Is Anvaya in my city?",       routeIntent: "delivery_check" }
    ]
  }
};
