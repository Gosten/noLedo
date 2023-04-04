// function removeFromList(name) {
//   // uibuilder.onChange("msg", function (msg) {
//   //   if (msg.topic === TOPIC.LOAD) {
//   //     if (msg.payload.length === 0) {
//   //       store.commit("setProblemList", []);
//   //       return console.warn("EMPTY PROBLEM LIST");
//   //     }
//   //     let newProblemList = JSON.parse(msg.payload).filter(
//   //       (element) => element.name !== name
//   //     );
//   //     console.log("new list: ", newProblemList);
//   // uibuilder.send({
//   //   topic: TOPIC.SAVE,
//   //   payload: JSON.stringify(newProblemList)
//   // });
//   // }
//   // });
//   // uibuilder.send({ topic: TOPIC.LOAD });
// }

// function clearList() {
//   // uibuilder.send({ topic: TOPIC.SAVE, payload: JSON.stringify([]) });
// }

// // function saveNewList(newList) {
// //   uibuilder.send({
// //     topic: "save",
// //     payload: JSON.stringify(newList)
// //   });
// //   uibuilder.send({ topic: TOPIC.LOAD });
// // }

function limitNameLength(name, length = 15) {
  if (name.length >= length) {
    let chars = name.split("").slice(0, length);
    let newName = chars.join("").concat("...");
    return newName;
  }
  return name;
}

function parseName(problem) {
  //connect problem name with author
  const shortName = limitNameLength(problem.name, 10);
  if (problem.author && ENABLE_AUTHOR)
    return `${shortName} (${problem.author})`;
  return limitNameLength(problem.name, 15);
}
