// enable board zoom in addProblem and editProblem
const ENABLE_BOARD_DESCRIPTION = false;

// enable multi color grip tap
const ENABLE_MULTI_TAP = true;

// toggle board scaling in active problem
const ACTIVE_PROBLEM_SCALING = false;

// enable board zoom in addProblem and editProblem
const ENABLE_ZOOM = true;

// enable problem grading
const ENABLE_GRADES = true;

// enable problem author
const ENABLE_AUTHOR = true;

// enable space in problem names
const ENABLE_SPACE_NAMES = true;

// toggle splash screen
const INTRO = false;

// active problem loop countdown time in seconds
const LOOP_COUNTDOWN_TIME = 6;

const GRADES = [
  "3a",
  "3b",
  "3c",
  "4a",
  "4b",
  "4c",
  "5a",
  "5b",
  "5c",
  "6a",
  "6b",
  "6c",
  "7a",
  "7b",
  "7c",
];

const DEFAULT_GRADE = 5; // Index of GRADES array

const COMMENT_DISPLAY_LENGTH = 85;

const BOARD_CONFIG = {
  // Board dimension
  rows: 19,
  columns: 27,

  // Board background image position offset in % of container size
  boardImgTop: -35,
  boardImgLeft: 0,

  // Font size of row/column description in % of container size
  descriptionFontSize: 50,

  multiTapColors: {
    0: [0, 0, 0],
    1: [0, 255, 0], // first tap
    2: [255, 0, 0], // secound tap
    3: [0, 0, 255], // third tap
    // 4: [255, 255, 0] // fourth tap
  },
};
