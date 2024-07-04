const defaultTheme = {
  label: "Default",
  background: "#252833",
  textColor: "#f7f1e9",
  typeBoxText: "#535a6a",
  cursor: "#ed4d56",
  correct: "#f7f1e9",
  incorrect: "#ed4d56",
};

const Bento = {
  label: "Bento",
  background: "#2d384c",
  textColor: "#dddbdc",
  typeBoxText: "#4a768d",

  correct: "#dddbdc",
  incorrect: "#e53e40",
  cursor: "#ff7b91",
};

const Breeze = {
  label: "Breeze",
  background: "#e8d5c4",
  textColor: "#131842",
  typeBoxText: "#459cba",

  correct: "#7d67a9",
  incorrect: "#9e3e6c",
  cursor: "#7d67a9",
};

export const Themes = [
  { label: "Default", value: defaultTheme },
  { label: "Bento", value: Bento },
  { label: "Breeze", value: Breeze },
];
