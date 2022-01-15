const DEFAULT_GRADE = 5; // Index of GRADES array

const BOARD_CONFIG = {
    //Board dimension
    columns: 12,
    rows: 4,
    
    //Size of grip, empty grip and grip selection in pixels
    gripSize: 10,
    emptyGripSize: 5,
    gripSelectionSize: 20,

    //For testing
    horizontalActiveBoardZoomModifier: 1,

    //Array that defines types of grips and their position. Array must contain the same number of elements as ( columns * rows )
    // 0 - empty position
    // 1 - color 1 
    // 2 - color 2 ...
    // to change colors check css/app_config.css
    gripPositions: [
        0, 0, 1, 0,
        1, 2, 4, 0,
        0, 1, 3, 3,
        4, 6, 5, 0,

        0, 0, 1, 0,
        1, 2, 4, 0,
        0, 1, 3, 3,
        4, 6, 5, 0,

        0, 0, 1, 0,
        1, 2, 4, 0,
        0, 1, 3, 3,
        4, 6, 5, 0,
    ],
}

// grip positions array index 

//     0,  1,  2,  3,
//     4,  5,  6,  7,
//     8,  9,  10, 11,
//     12, 13, 14, 15

const diodeIndexes = {
    2: 40,
    4: 28,
    5: 30,
    6: 33,
    9: 26,
    10: 23,
    11: 20,
    12: 9,
    13: 12,
    14: 16,
}

const INTRO = true;

const GRADES = [ 
    "1", "2",
    "3a", "3b", "3c",
    "4a", "4b", "4c", 
    "5a", "5b", "5c", 
    "6a", "6a+", "6b", "6b+", "6c", "6c+", 
    "7a", "7a+", "7b", "7b+", "7c", "7c+",
    "8a", "8a+", "8b", "8b+", "8c", "8c+",
    "9a"];

