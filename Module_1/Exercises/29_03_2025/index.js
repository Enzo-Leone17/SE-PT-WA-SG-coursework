/*In a Learning Management System (LMS), we need to define several key classes to manage 
users, courses, lessons, assessments, enrollments, and grades.*/

// class LMS{
//     users = Users;
//     courses = Courses;
// }

// class Users{
//     id = String;
//     username = String;
//     email = String;
//     passwordHash = String;
//     occupation =  String;
//     createdAt = Date;
//     assessment = [];
//     grade = [];
// }

// class Courses{
//     lessons = [];
//     courseId = String;
//     title = String;
//     description = String;
//     instructorId = String;
//     category = String;
//     duration = Duration;
//     createdAt  = Date;
// }

// class Duration{
//     startDate = Date;
//     endDate = Date;
// }

// class Lessons{
//     lessonId = String;
//     courseId = String;
//     title = String;
//     content = String;
//     videoUrl = String;
//     duration = Duration;
//     createdAt  = Date;
// }

// class Assessment{
//     assessmentId = String;
//     courseId = String;
//     title = String;
//     questionList = [];
//     maxScore = Number;
//     passingScore  = Number;
// }

// class Enrollment {
//     enrollmentId = String;
//     userId = String;
//     courseId = String;
//     enrollmentDate = Date;
//     progress = String;
// }

// class Grade {
//     gradeId = String;
//     userId = String;
//     assessmentId = String;
//     score = Number;
//     passed = Boolean;
//     constructor(gradeID, userID, assessmentID, score, passed)
//     {
//         this.gradeId = gradeID;
//         this.userId = userID;
//         this.assessmentId = assessmentID;
//         this.score = score;
//         this.passed = passed;

//     }
// }

//JSON practice
const userData = {
  users: [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      role: "student",
      createdAt: "2023-01-15T08:30:00Z",
    },
    {
      id: 2,
      username: "jane_instructor",
      email: "jane@lms.com",
      role: "instructor",
      createdAt: "2022-06-10T12:00:00Z",
    },
    {
      id: 3,
      username: "admin_user",
      email: "admin@lms.com",
      role: "admin",
      createdAt: "2021-05-01T09:15:00Z",
    },
  ],
  courses: [
    {
      courseId: 101,
      title: "JavaScript Basics",
      description: "Learn the fundamentals of JavaScript.",
      instructorId: 2,
      category: "Programming",
      duration: "4 hours",
      createdAt: "2023-02-01T14:30:00Z",
    },
    {
      courseId: 102,
      title: "Python for Data Science",
      description: "Analyze data using Python libraries.",
      instructorId: 2,
      category: "Data Science",
      duration: "6 hours",
      createdAt: "2023-03-05T10:00:00Z",
    },
    {
      courseId: 103,
      title: "Web Development Bootcamp",
      description: "Learn HTML, CSS, and JavaScript to build modern websites.",
      instructorId: 2,
      category: "Web Development",
      duration: "12 hours",
      createdAt: "2023-01-20T11:45:00Z",
    },
  ],
  lessons: [
    {
      lessonId: 1,
      courseId: 101,
      title: "Introduction to JavaScript",
      content: "Basics of JavaScript syntax and variables.",
      videoUrl: "https://videos.lms.com/js_intro.mp4",
      duration: "30 minutes",
      order: 1,
    },
    {
      lessonId: 2,
      courseId: 101,
      title: "Functions and Loops",
      content: "Understanding functions and loops in JavaScript.",
      videoUrl: "https://videos.lms.com/js_loops.mp4",
      duration: "45 minutes",
      order: 2,
    },
    {
      lessonId: 3,
      courseId: 102,
      title: "Data Analysis with Pandas",
      content: "Exploring data using the Pandas library.",
      videoUrl: "https://videos.lms.com/python_pandas.mp4",
      duration: "60 minutes",
      order: 1,
    },
  ],
  enrollments: [
    {
      enrollmentId: 501,
      userId: 1,
      courseId: 101,
      enrollmentDate: "2023-02-15T08:00:00Z",
      progress: 75,
      status: "in-progress",
    },
    {
      enrollmentId: 502,
      userId: 1,
      courseId: 103,
      enrollmentDate: "2023-03-01T09:30:00Z",
      progress: 25,
      status: "in-progress",
    },
  ],
  assessments: [
    {
      assessmentId: 301,
      courseId: 101,
      title: "JavaScript Quiz",
      questionList: ["What is a closure?", "Explain event bubbling."],
      maxScore: 100,
      passingScore: 60,
    },
    {
      assessmentId: 302,
      courseId: 102,
      title: "Python Data Science Exam",
      questionList: [
        "What is a DataFrame?",
        "Explain data cleaning with Pandas.",
      ],
      maxScore: 100,
      passingScore: 70,
    },
  ],
  grades: [
    {
      gradeId: 801,
      userId: 1,
      assessmentId: 301,
      score: 85,
      passed: true,
      submissionDate: "2023-02-25T14:00:00Z",
    },
    {
      gradeId: 802,
      userId: 1,
      assessmentId: 302,
      score: 55,
      passed: false,
      submissionDate: "2023-03-10T10:30:00Z",
    },
  ],
};

//Specify a specific role and filter the user data based on that role.
function getUserRole(specificRole, dataArr) {
  let filteredUser = [];
  let userDetails = [];
  if (dataArr?.users) {
    userDetails = dataArr.users;
  }
  for (let i = 0; i < userDetails.length; i++) {
    if (userDetails[i]?.role === specificRole) {
      filteredUser.push(userDetails[i]);
    }
  }
  return filteredUser;
}

console.log(getUserRole("student", userData));

function calculateAverageScores(dataArr) {
  let totalScore = 0;
  let gradeDetails = [];
  if (dataArr?.grades) {
    gradeDetails = dataArr.grades;
  }
  for (let i = 0; i < gradeDetails.length; i++) {
    if (gradeDetails[i]?.score) {
      totalScore += gradeDetails[i].score;
    }
  }
  return totalScore / gradeDetails.length;
}

console.log("Average score is: " + calculateAverageScores(userData));

function fetchVideoUrls(dataArr) {
  let resultUrl = "";
  let lessonDetails = [];
  if (dataArr?.lessons) {
    lessonDetails = dataArr.lessons;
  }
  for (let i = 0; i < lessonDetails.length; i++) {
    if (lessonDetails[i]?.videoUrl) {
      resultUrl += lessonDetails[i].videoUrl;
      i < lessonDetails.length - 1 ? (resultUrl += "\n") : (resultUrl += "");
    }
  }
  return resultUrl;
}

console.log(fetchVideoUrls(userData));




//stock preference application
/* Example for the array (business requirement)
Stock Preference Application
This application helps users easily manage their investment preferences by allowing them to choose their
top 3 favorite stocks from a list of 15 options. Users can view the entire stock list with prices, select their preferred stocks, 
and make changes to their choices as needed.

Key Features:
View Stock List: Users can see all available stock options along with their current prices.
Select Preferences: Users can pick their top 3 preferred stocks.
Change Preferences: Users can remove a selected stock and choose a new one if their priorities change.
View Selections: Users can view their current top 3 preferences at any time.

The application is designed to be straightforward and efficient, making it easy for users to manage their investment preferences.
Here is the list stock option
Here’s a sample of 15 stocks with their prices:

Apple (AAPL) - $172.50
Microsoft (MSFT) - $310.20
Amazon (AMZN) - $130.75
Tesla (TSLA) - $680.30
Google (GOOGL) - $2,500.10
Meta (META) - $280.45
Nvidia (NVDA) - $450.25
Netflix (NFLX) - $400.60
Disney (DIS) - $90.20
Coca-Cola (KO) - $60.50
Pfizer (PFE) - $39.80
Ford (F) - $13.60
Intel (INTC) - $35.25
AMD (AMD) - $115.80
Boeing (BA) - $180.75

*/

//plans to go about it ?

//class User: name = String, lastUpdate = date, userId = String

//class StockPreferences: priority = number (small = higher), stock = Stock (subclass), lastUpdate = date

//sub class Stock: stockId = String, stockName = String, stockPrice = number, stockSymbol = String
