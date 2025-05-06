
//Front end, display dynamic content in div element 
const dynamicContent = document.getElementById("dynamic-content"); 

//sample data
const dataSet = [
  {
    id: 1,
    name: "Alice Nguyen",
    age: 20,
    score: 85,
    email: "alice.nguyen@example.com",
    gender: "female",
    major: "Computer Science",
  },
  {
    id: 2,
    name: "Benjamin Carter",
    age: 22,
    score: 72,
    email: "ben.carter@example.com",
    gender: "male",
    major: "Mathematics",
  },
  {
    id: 3,
    name: "Chloe Zhang",
    age: 19,
    score: 90,
    email: "chloe.zhang@example.com",
    gender: "female",
    major: "Design",
  },
  {
    id: 4,
    name: "Daniel Li",
    age: 21,
    score: 65,
    email: "daniel.li@example.com",
    gender: "male",
    major: "Business",
  },
  {
    id: 5,
    name: "Emma Vo",
    age: 23,
    score: 78,
    email: "emma.vo@example.com",
    gender: "female",
    major: "Psychology",
  },
  {
    id: 6,
    name: "Franklin White",
    age: 20,
    score: 82,
    email: "frank.white@example.com",
    gender: "male",
    major: "Engineering",
  },
  {
    id: 7,
    name: "Grace Lin",
    age: 24,
    score: 88,
    email: "grace.lin@example.com",
    gender: "female",
    major: "Nursing",
  },
  {
    id: 8,
    name: "Henry Wang",
    age: 21,
    score: 60,
    email: "henry.wang@example.com",
    gender: "male",
    major: "Philosophy",
  },
  {
    id: 9,
    name: "Isabella Chen",
    age: 22,
    score: 95,
    email: "isabella.chen@example.com",
    gender: "female",
    major: "Biotechnology",
  },
  {
    id: 10,
    name: "Jordan Lam",
    age: 20,
    score: 70,
    email: "jordan.lam@example.com",
    gender: "non-binary",
    major: "Sociology",
  },
  {
    id: 11,
    name: "Kevin Le",
    age: 18,
    score: 55,
    email: "kevin.le@example.com",
    gender: "male",
    major: "Economics",
  },
  {
    id: 12,
    name: "Laura Smith",
    age: 25,
    score: 83,
    email: "laura.smith@example.com",
    gender: "female",
    major: "Education",
  },
  {
    id: 13,
    name: "Michael Huynh",
    age: 22,
    score: 68,
    email: "michael.huynh@example.com",
    gender: "male",
    major: "Computer Science",
  },
  {
    id: 14,
    name: "Nina Quach",
    age: 21,
    score: 91,
    email: "nina.quach@example.com",
    gender: "female",
    major: "Design",
  },
  {
    id: 15,
    name: "Olivia Zhou",
    age: 20,
    score: 74,
    email: "olivia.zhou@example.com",
    gender: "female",
    major: "Law",
  },
  {
    id: 16,
    name: "Phuong Tran",
    age: 23,
    score: 88,
    email: "phuong.tran@example.com",
    gender: "non-binary",
    major: "Political Science",
  },
  {
    id: 17,
    name: "Qi Liu",
    age: 21,
    score: 66,
    email: "qi.liu@example.com",
    gender: "male",
    major: "Chemistry",
  },
  {
    id: 18,
    name: "Rachel Gao",
    age: 22,
    score: 92,
    email: "rachel.gao@example.com",
    gender: "female",
    major: "Biomedical Science",
  },
  {
    id: 19,
    name: "Samuel Tan",
    age: 19,
    score: 61,
    email: "samuel.tan@example.com",
    gender: "male",
    major: "Architecture",
  },
  {
    id: 20,
    name: "Tracy Cooper",
    age: 24,
    score: 98,
    email: "tracy.cooper@example.com",
    gender: "female",
    major: "Data Science",
  },
];

//filter by score (min, max) >> return students with score >= min && score <= max
const filterByScore = (dataToFilter = dataSet, min = 0, max = 0) => {
  //1st case : filter by minimum score (score >= min)
  if (min > max) {
    return dataToFilter.filter((student) => student.score >= min);
  }
  //2nd case : filter by maximum score (score <= max)
  else if (max > min && max !== 0) {
    return dataToFilter.filter((student) => student.score <= max);
  }
  //3rd case : filter by score between min and max (score >= min && score <= max)
  else if (min !== 0 && max === 0) {
    return dataToFilter.filter(
      (student) => student.score >= min && student.score <= max
    );
  }
};

//filter by major >> return students with major === major
const filterByMajor = (dataToFilter = dataSet, major) => {
  return dataToFilter.filter((student) => student.major === major);
};

//filter by gender >> return students with gender === gender
const filterByGender = (dataToFilter = dataSet, gender) => {
  return dataToFilter.filter((student) => student.gender === gender);
};

//search by name or email >> return students with name or email containing query
const searchByNameOrEmail = (dataToFilter = dataSet, query) => {
  return dataToFilter.filter(
    (student) =>
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.email.toLowerCase().includes(query.toLowerCase())
  );
};

//apply multiple filters
// eg filters = { gender: 'female', score: {min: 70}, major: 'Design' }
const applyFilters = (filters) => {
  let filteredData = dataSet;
  for (let [filterKey, filterValue] of Object.entries(filters)) {
    //for each filter, apply the filter function to the filteredData
    if (filterKey === "score") {
      filteredData = filterByScore(
        filteredData,                
        filterValue.min,
        filterValue.max
      );
    } else if (filterKey === "major") {
      filteredData = filterByMajor(filteredData, filterValue);
    } else if (filterKey === "gender") {
      filteredData = filterByGender(filteredData, filterValue);
    } else if (filterKey === "name" || filterKey === "email") {
      filteredData = searchByNameOrEmail(filteredData, filterValue);
    }
  }
  return filteredData;
};

console.log(
  applyFilters({ gender: "female", score: { min: 70 }, major: "Design" })
);



