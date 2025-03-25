//Create students data
const students = [
  { name: "Alice", age: 20, grade: 85 },
  { name: "Bob", age: 22, grade: 92 },
  { name: "Charlie", age: 19, grade: 78 },
  { name: "David", age: 21, grade: 88 },
  { name: "Eve", age: 20, grade: 95 },
];

//Print students name

function getStudentNames() {
  console.log("Student names: ");
  for (let s = 0; s < students.length; s++) {
    if (students[s]?.name) {
      console.log("Name: " + students[s].name);
    }
  }
}

function getAverageScore() {
  let totalScore = 0;
  for (let s = 0; s < students.length; s++) {
    if (students[s]?.grade) {
      totalScore += students[s].grade;
    }
  }
  console.log("Average score of : " + totalScore / students.length);
}

function getBestPerforming() {
  let bestPerformingStudents = new Array(students[0]); //assuming first student == highest grade
  for (let s = 0; s < students.length; s++) {
    if (
      students[s]?.grade &&
      students[s].grade > bestPerformingStudents[0]?.grade
    ) {
      bestPerformingStudents = new Array(students[s]);
    } else if (
      students[s]?.grade &&
      students[s].grade == bestPerformingStudents[0]?.grade &&
      students[s].name != bestPerformingStudents[0].name
    ) {
      bestPerformingStudents.push(students[s]);
    }
  }
  if (bestPerformingStudents.length == 1) {
    console.log(
      "Best performing student is : " +
        bestPerformingStudents[0].name +
        " " +
        "\nWith a highscore of " +
        bestPerformingStudents[0].grade
    );
  } else {
    let bestPerformingStudentsNames = "";
    for (n = 0; n < bestPerformingStudents.length; n++) {
      if (n != bestPerformingStudents.length - 1) {
        bestPerformingStudentsNames += bestPerformingStudents[n].name + ", ";
      } else {
        bestPerformingStudentsNames += bestPerformingStudents[n].name + ".";
      }
    }
    console.log(
      "Best performing students are : " +
        bestPerformingStudentsNames +
        " " +
        "\nWith a highscore of " +
        bestPerformingStudents[0].grade
    );
  }
}

function groupStudentsByAge() {
  let teenagers = []; //teens 20 and below
  let teenAdults = []; //teens 21 and above
  for (let s = 0; s < students.length; s++) {
    if (students[s]?.age && students[s].age <= 20) {
      teenagers.push(students[s]);
    } else if (students[s]?.age && students[s].age > 20) {
      teenAdults.push(students[s]);
    }
  }
  let adviceMessage = "Advised to group students in the following category: \n";
  adviceMessage += "Teenagers: ";
  for (let t = 0; t < teenagers.length; t++) {
    if (teenagers[t]?.name) {
      adviceMessage += teenagers[t].name + "(age: " + teenagers[t].age + ") ";
    }
  }

  adviceMessage += "\nTeenAdults: ";

  for (let ta = 0; ta < teenAdults.length; ta++) {
    if (teenAdults[ta]?.name) {
      adviceMessage +=
        teenAdults[ta].name + "(age: " + teenAdults[ta].age + ") ";
    }
  }
  console.log(adviceMessage);
}
getStudentNames();
getAverageScore();
getBestPerforming();
groupStudentsByAge();
