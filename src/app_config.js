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

const DEFAULT_GRADE = 5; // Index of GRADES array

const BOARD_CONFIG = {
	//Board dimension
	columns: 6,
	rows: 8,

	//Size of grip, empty grip and grip selection in % of container size
	gripSize: 30,
	emptyGripSize: 15,
	gripSelectionSize: 80,
	gripSelectionBorder: 4,

	//For testing
	horizontalActiveBoardZoomModifier: 0.5,

	//Array that defines types of grips and their position. Array must contain the same number of elements as ( columns * rows )
	// 0 - empty position
	// 1 - color 1
	// 2 - color 2 ...
	// to change colors check css/app_config.css
	gripPositions: [
		0, 0, 1, 0, 1, 2, 4, 1, 0, 1, 3, 0, 0, 2, 4, 0, 1, 1, 2, 1, 0, 1, 0, 4, 0,
		3, 2, 0, 1, 2, 4, 1, 0, 1, 3, 0, 0, 4, 1, 0, 1, 1, 3, 1, 0, 1, 3, 3,
		// 0, 0, 1, 0, 1, 2,
		// 4, 1, 0, 1, 3, 3,
		// 0, 2, 4, 0, 1, 2,
		// 2, 0, 0, 1, 3, 4,
		// 0, 3, 2, 0, 1, 2,
		// 4, 0, 0, 1, 3, 3,
		// 0, 4, 1, 0, 1, 4,
		// 3, 0, 0, 1, 3, 3,
	],

	// gripPositions: [
	// 	//	0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
	// 		6,4,2,1,5,0,3,6,2,1,5,6,5,2,3,4,0,0,0,4,
	// 	//	20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,
	// 		1,1,1,3,6,2,1,5,1,1,5,2,1,4,1,2,1,4,2,2,
	// 	//	40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,
	// 		6,5,2,1,3,4,4,5,1,5,5,5,5,3,5,6,5,6,3,4,
	// 	//	60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,
	// 		5,5,2,4,6,2,3,4,6,3,5,4,5,4,1,5,3,3,6,6,
	// 	//	80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,
	// 		2,5,4,4,5,3,3,4,5,5,2,6,2,1,3,6,2,2,3,6,
	// 	//	100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,
	// 		3,1,1,1,2,3,4,1,5,3,1,6,1,3,4,5,5,3,5,6,
	// 	//	120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,
	// 		4,5,1,4,1,4,3,3,1,4,5,3,6,1,5,2,6,2,3,5,
	// 	//	140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,
	// 		3,6,3,3,5,3,6,6,5,3,2,6,4,5,1,1,5,6,6,4,
	// 	//	160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,
	// 		3,6,5,1,5,3,5,5,3,2,3,3,5,6,2,5,3,2,2,2,
	// 	//	180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,
	// 		5,1,4,6,1,1,6,4,1,2,5,6,5,6,2,6,2,5,6,5,
	// 	//	200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,
	// 		2,6,1,5,3,3,1,4,1,5,2,3,4,5,3,5,2,1,2,6,
	// 	//	220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,
	// 		3,4,6,5,1,6,4,1,2,6,3,3,5,2,5,4,6,1,1,6,
	// 	//	240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,
	// 		3,4,6,1,3,6,1,1,5,4,5,1,6,1,1,6,2,1,1,1,
	// 	//	260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,
	// 		4,4,4,6,2,2,6,2,5,2,6,6,6,1,4,4,5,3,3,2,
	// 	//	280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,
	// 		1,2,4,4,1,2,6,1,3,1,3,2,1,3,6,5,3,3,5,6

	// 		],
};

// const diodeIndexes = {
// 0 : 166 ,
// 1 : 294 ,
// 2 : 206 ,
// 3 : 57 ,
// 4 : 66 ,
// 5 : 106 ,
// 6 : 153 ,
// 7 : 208 ,
// 8 : 272 ,
// 9 : 1 ,
// 10 : 43 ,
// 11 : 221 ,
// 12 : 170 ,
// 13 : 284 ,
// 14 : 92 ,
// 15 : 274 ,
// 16 : 73 ,
// 17 : 124 ,
// 18 : 138 ,
// 19 : 165 ,
// 20 : 62 ,
// 21 : 50 ,
// 22 : 197 ,
// 23 : 199 ,
// 24 : 56 ,
// 25 : 169 ,
// 26 : 172 ,
// 27 : 61 ,
// 28 : 100 ,
// 29 : 171 ,
// 30 : 289 ,
// 31 : 98 ,
// 32 : 29 ,
// 33 : 259 ,
// 34 : 64 ,
// 35 : 42 ,
// 36 : 253 ,
// 37 : 13 ,
// 38 : 129 ,
// 39 : 192 ,
// 40 : 87 ,
// 41 : 140 ,
// 42 : 20 ,
// 43 : 188 ,
// 44 : 213 ,
// 45 : 297 ,
// 46 : 93 ,
// 47 : 53 ,
// 48 : 74 ,
// 49 : 97 ,
// 50 : 59 ,
// 51 : 31 ,
// 52 : 35 ,
// 53 : 191 ,
// 54 : 162 ,
// 55 : 178 ,
// 56 : 299 ,
// 57 : 113 ,
// 58 : 205 ,
// 59 : 183 ,
// 60 : 37 ,
// 61 : 219 ,
// 62 : 194 ,
// 63 : 236 ,
// 64 : 108 ,
// 65 : 38 ,
// 66 : 163 ,
// 67 : 231 ,
// 68 : 249 ,
// 69 : 242 ,
// 70 : 195 ,
// 71 : 147 ,
// 72 : 101 ,
// 73 : 28 ,
// 74 : 67 ,
// 75 : 49 ,
// 76 : 174 ,
// 77 : 179 ,
// 78 : 2 ,
// 79 : 215 ,
// 80 : 270 ,
// 81 : 78 ,
// 82 : 239 ,
// 83 : 277 ,
// 84 : 149 ,
// 85 : 144 ,
// 86 : 230 ,
// 87 : 234 ,
// 88 : 143 ,
// 89 : 88 ,
// 90 : 54 ,
// 91 : 109 ,
// 92 : 186 ,
// 93 : 267 ,
// 94 : 83 ,
// 95 : 148 ,
// 96 : 131 ,
// 97 : 34 ,
// 98 : 154 ,
// 99 : 116 ,
// 100 : 201 ,
// 101 : 26 ,
// 102 : 18 ,
// 103 : 220 ,
// 104 : 196 ,
// 105 : 23 ,
// 106 : 268 ,
// 107 : 212 ,
// 108 : 258 ,
// 109 : 224 ,
// 110 : 115 ,
// 111 : 155 ,
// 112 : 146 ,
// 113 : 240 ,
// 114 : 102 ,
// 115 : 275 ,
// 116 : 90 ,
// 117 : 214 ,
// 118 : 120 ,
// 119 : 198 ,
// 120 : 266 ,
// 121 : 207 ,
// 122 : 128 ,
// 123 : 210 ,
// 124 : 246 ,
// 125 : 63 ,
// 126 : 68 ,
// 127 : 209 ,
// 128 : 204 ,
// 129 : 287 ,
// 130 : 33 ,
// 131 : 217 ,
// 132 : 52 ,
// 133 : 135 ,
// 134 : 257 ,
// 135 : 17 ,
// 136 : 3 ,
// 137 : 226 ,
// 138 : 282 ,
// 139 : 130 ,
// 140 : 255 ,
// 141 : 261 ,
// 142 : 280 ,
// 143 : 103 ,
// 144 : 122 ,
// 145 : 273 ,
// 146 : 41 ,
// 147 : 181 ,
// 148 : 136 ,
// 149 : 105 ,
// 150 : 293 ,
// 151 : 107 ,
// 152 : 99 ,
// 153 : 177 ,
// 154 : 265 ,
// 155 : 167 ,
// 156 : 276 ,
// 157 : 14 ,
// 158 : 44 ,
// 159 : 281 ,
// 160 : 111 ,
// 161 : 176 ,
// 162 : 40 ,
// 163 : 159 ,
// 164 : 223 ,
// 165 : 233 ,
// 166 : 126 ,
// 167 : 271 ,
// 168 : 89 ,
// 169 : 123 ,
// 170 : 150 ,
// 171 : 285 ,
// 172 : 145 ,
// 173 : 288 ,
// 174 : 200 ,
// 175 : 9 ,
// 176 : 96 ,
// 177 : 296 ,
// 178 : 58 ,
// 179 : 127 ,
// 180 : 48 ,
// 181 : 175 ,
// 182 : 12 ,
// 183 : 152 ,
// 184 : 72 ,
// 185 : 36 ,
// 186 : 263 ,
// 187 : 80 ,
// 188 : 251 ,
// 189 : 243 ,
// 190 : 151 ,
// 191 : 232 ,
// 192 : 260 ,
// 193 : 168 ,
// 194 : 222 ,
// 195 : 133 ,
// 196 : 132 ,
// 197 : 157 ,
// 198 : 4 ,
// 199 : 32 ,
// 200 : 189 ,
// 201 : 203 ,
// 202 : 19 ,
// 203 : 286 ,
// 204 : 216 ,
// 205 : 218 ,
// 206 : 45 ,
// 207 : 229 ,
// 208 : 227 ,
// 209 : 256 ,
// 210 : 81 ,
// 211 : 47 ,
// 212 : 94 ,
// 213 : 237 ,
// 214 : 86 ,
// 215 : 225 ,
// 216 : 193 ,
// 217 : 39 ,
// 218 : 137 ,
// 219 : 114 ,
// 220 : 202 ,
// 221 : 76 ,
// 222 : 95 ,
// 223 : 16 ,
// 224 : 161 ,
// 225 : 65 ,
// 226 : 164 ,
// 227 : 118 ,
// 228 : 182 ,
// 229 : 117 ,
// 230 : 77 ,
// 231 : 298 ,
// 232 : 91 ,
// 233 : 238 ,
// 234 : 254 ,
// 235 : 8 ,
// 236 : 173 ,
// 237 : 252 ,
// 238 : 142 ,
// 239 : 139 ,
// 240 : 104 ,
// 241 : 269 ,
// 242 : 264 ,
// 243 : 82 ,
// 244 : 30 ,
// 245 : 292 ,
// 246 : 75 ,
// 247 : 245 ,
// 248 : 69 ,
// 249 : 141 ,
// 250 : 247 ,
// 251 : 241 ,
// 252 : 21 ,
// 253 : 156 ,
// 254 : 160 ,
// 255 : 190 ,
// 256 : 279 ,
// 257 : 70 ,
// 258 : 24 ,
// 259 : 112 ,
// 260 : 290 ,
// 261 : 158 ,
// 262 : 15 ,
// 263 : 55 ,
// 264 : 180 ,
// 265 : 211 ,
// 266 : 125 ,
// 267 : 85 ,
// 268 : 235 ,
// 269 : 6 ,
// 270 : 84 ,
// 271 : 71 ,
// 272 : 250 ,
// 273 : 79 ,
// 274 : 110 ,
// 275 : 10 ,
// 276 : 121 ,
// 277 : 22 ,
// 278 : 248 ,
// 279 : 278 ,
// 280 : 134 ,
// 281 : 228 ,
// 282 : 291 ,
// 283 : 119 ,
// 284 : 244 ,
// 285 : 51 ,
// 286 : 185 ,
// 287 : 27 ,
// 288 : 184 ,
// 289 : 11 ,
// 290 : 187 ,
// 291 : 7 ,
// 292 : 283 ,
// 293 : 5 ,
// 294 : 262 ,
// 295 : 60 ,
// 296 : 25 ,
// 297 : 295 ,
// 298 : 46 ,
// 299 : 299 ,
// }

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
};

const GRADES = [
	'1',
	'2',
	'3a',
	'3b',
	'3c',
	'4a',
	'4b',
	'4c',
	'5a',
	'5b',
	'5c',
	'6a',
	'6a+',
	'6b',
	'6b+',
	'6c',
	'6c+',
	'7a',
	'7a+',
	'7b',
	'7b+',
	'7c',
	'7c+',
	'8a',
	'8a+',
	'8b',
	'8b+',
	'8c',
	'8c+',
	'9a',
];
