/*//Given an array of students with score, use map() to add a passed: true/false field based on score >= 60.

const students = [
  { name: "John", score: 75 },
  { name: "Jane", score: 55 },
];

let result = students.map((student) => {
  let studentUpdated = { ...student, passed: true }; //clone student existing info, add passed property
  student.score >= 60
    ? (studentUpdated.passed = true)
    : (studentUpdated.passed = false);
  return studentUpdated;
});

console.log(result);*/

const students2 = [
  { name: "Alice", score: 88, age: 22 },
  { name: "Bob", score: 88, age: 20 },
  { name: "Charlie", score: 95, age: 23 },
  { name: "Diana", score: 60, age: 21 },
  { name: "Eve", score: 95, age: 22 },
];

/*First, sort by score in descending order.
  
  If two students have the same score, sort them by age in ascending order.*/

const sortStudentsByScore = () => {
  return students2.sort(
    (
      firstStudent,
      secondStudent //sort method
    ) =>
      firstStudent.score != secondStudent.score //check if score are same
        ? secondStudent.score - firstStudent.score //if score different, sort by higher score to lower score
        : firstStudent.age - secondStudent.age // else if score same, sort by younger age to older age
  );
};
console.log("\nSorting students by score, or by age if score is same: ");
console.log(sortStudentsByScore());

/*Smart Shopper Challenge
You work at a supermarket and have a list of customers with their shopping data. Each customer has:

- their name
- total money spent
- how many items they bought
- whether they are a member 

1. Find the top spender among members only.
2. Find out customers who spent more than 100 and bought at least 5 items.
3. Sort this final list by the number of items bought (most to least).*/

const customers = [
  { name: "Lana", spent: 120, items: 7, member: true },
  { name: "Mike", spent: 80, items: 4, member: false },
  { name: "Sara", spent: 150, items: 6, member: true },
  { name: "Tom", spent: 90, items: 5, member: false },
  { name: "Emma", spent: 110, items: 10, member: false },
  { name: "John", spent: 160, items: 3, member: true },
];

const findTopSpendingMember = () => {
  let topSpender = new Array();
  topSpender.push(customers[0]); //assume first guy as top spender
  customers.map((customer) => {
    if (customer.member == true && customer.spent > topSpender[0].spent) {
      topSpender.shift();
      topSpender.push(customer); //replace topSpender array data with new member data if the spent > topSpender spent
    }
  });
  return topSpender;
};

console.log("\nTop Spending member is: ");
console.log(findTopSpendingMember());

/**
 * find customer who spent more than x amt and bought y items
 * @param spentAmt the amount spent
 * @param itemAmt amount of items bought
 * @returns
 */
const filterCustomerSpentAmountAndItems = (spentAmt = 100, itemAmt = 5) => {
  let customerResult = new Array();
  customers.map((customer) => {
    if (customer.spent > spentAmt && customer.items >= 5) {
      customerResult.push(customer);
    }
  });
  return customerResult;
};

console.log(
  "\nMembers who bought more than 100 dollars and minimally 5 items: "
);
console.log(filterCustomerSpentAmountAndItems());

const sortListByItemsPurchased = (final_list, descending = true) => {
  return final_list.sort(
    (consummerA, consummerB) => consummerB?.items - consummerA?.items
  );
};

console.log("\nsort list: ");
console.log(sortListByItemsPurchased(customers));

/*Travel Agency VIP Analysis
You run a travel agency and have a list of recent clients. Each client has:
their name
their country
number of trips booked
total money spent
whether they joined the loyalty program (true or false)
----------------------------------------------------------------------------------------------
Your tasks:
1.Find the most valuable customer (highest spender) from Japan who is in the loyalty program.

2.Filter out clients who:
booked at least 2 trips, and
spent more than 1000, and
are not in the loyalty program

3.Map the filtered list into a summary format showing:
their name
their country
a new label:
"Frequent Flyer" if they booked more than 3 trips
"Explorer" otherwise

4.Sort the final list by country name alphabetically, and if the country is the same, by money spent (highest first)*/
const clients = [
  { name: "Hiroshi", country: "Japan", trips: 4, spent: 2000, loyalty: true },
  { name: "Anna", country: "USA", trips: 1, spent: 800, loyalty: false },
  { name: "Kenji", country: "Japan", trips: 3, spent: 1500, loyalty: true },
  { name: "Laura", country: "Germany", trips: 2, spent: 1100, loyalty: false },
  { name: "Carlos", country: "Spain", trips: 5, spent: 2200, loyalty: false },
  { name: "Mei", country: "China", trips: 3, spent: 1300, loyalty: false },
  { name: "Tom", country: "Japan", trips: 2, spent: 950, loyalty: false },
  { name: "Isla", country: "UK", trips: 4, spent: 1700, loyalty: true },
];

/**
 * find "MVC" based on money spent (highest)
 * @param countryOf additional option to filter by country
 * @param isLoyaltyMember additional option to filter loyalty membership, input value 'true' or 'false'
 */
const findMostValuableCustomer = (countryOf = "", isLoyaltyMember = "all") => {
  let biggestSpender = new Array();
  if (countryOf != "") {
    if (isLoyaltyMember.toLowerCase() == "true") {
      let applicableClients = clients.filter(
        (theClient) =>
          theClient.country.toLowerCase() == countryOf.toLowerCase() &&
          theClient.loyalty
      );
      biggestSpender.push(applicableClients[0]);
      applicableClients.forEach((member) => {
        if (member.spent > biggestSpender[0].spent) {
          biggestSpender = new Array();
          biggestSpender.push(member);
        } else if (member.spent == biggestSpender[0].spent) {
          biggestSpender.push(member);
        }
      });
    } else if (isLoyaltyMember.toLowerCase() == "false") {
      let applicableClients = clients.filter(
        (theClient) =>
          theClient.country.toLowerCase() == countryOf.toLowerCase() &&
          !theClient.loyalty
      );
      biggestSpender.push(applicableClients[0]);
      applicableClients.forEach((member) => {
        if (member.spent > biggestSpender[0].spent) {
          biggestSpender = new Array();
          biggestSpender.push(member);
        } else if (member.spent == biggestSpender[0].spent) {
          biggestSpender.push(member);
        }
      });
    } else {
      let applicableClients = clients.filter(
        (theClient) =>
          theClient.country.toLowerCase() == countryOf.toLowerCase()
      );
      biggestSpender.push(applicableClients[0]);
      applicableClients.forEach((member) => {
        if (member.spent > biggestSpender[0].spent) {
          biggestSpender = new Array();
          biggestSpender.push(member);
        } else if (member.spent == biggestSpender[0].spent) {
          biggestSpender.push(member);
        }
      });
    }
  } else {
    biggestSpender.push(clients[0]);
    clients.forEach((cust) => {
      if (cust.spent > biggestSpender[0].spent) {
        biggestSpender = new Array();
        biggestSpender.push(cust);
      } else if (cust.spent == biggestSpender[0].spent) {
        biggestSpender.push(cust);
      }
    });
  }
  return biggestSpender;
};

console.log(
  "\nThe Most Valuable Customer from Japan with Loyalty membership is: "
);
console.log(findMostValuableCustomer("japan", "true"));

/*Airbnb Host Dashboard
You are improving your Airbnb host dashboard to better analyze guest activity. You now have a longer list of guests, and some of them may:
Have stayed 0 nights (cancelled bookings),
Have very high or suspicious payments,
Be from the same country but not verified.
Your Tasks (Same, but Trickier)
-------------------------------------------------------
1.Find the highest-paying verified guest from Canada.
2.Filter guests who:
Stayed at least 3 nights, AND
Paid more than $500, AND
Were not verified
3.Map that filtered list to include:
name
nights
a new label guestType:
"Premium Guest" if totalPaid > 1000
"Regular Guest" otherwise
4.Sort the result by:
nights stayed (highest first),
then by totalPaid (highest first)*/
const guests = [
  {
    name: "Emily",
    country: "Canada",
    nights: 5,
    totalPaid: 1200,
    isVerified: true,
  },
  {
    name: "Raj",
    country: "India",
    nights: 2,
    totalPaid: 450,
    isVerified: true,
  },
  {
    name: "Sophie",
    country: "France",
    nights: 3,
    totalPaid: 800,
    isVerified: false,
  },
  {
    name: "Liam",
    country: "Canada",
    nights: 4,
    totalPaid: 950,
    isVerified: true,
  },
  {
    name: "Noah",
    country: "USA",
    nights: 1,
    totalPaid: 300,
    isVerified: false,
  },
  { name: "Ava", country: "Canada", nights: 0, totalPaid: 0, isVerified: true },
  {
    name: "Mia",
    country: "Australia",
    nights: 4,
    totalPaid: 1300,
    isVerified: false,
  },
  {
    name: "Leo",
    country: "Germany",
    nights: 5,
    totalPaid: 1000,
    isVerified: true,
  },
  {
    name: "Chloe",
    country: "Brazil",
    nights: 6,
    totalPaid: 1100,
    isVerified: false,
  },
  {
    name: "Daniel",
    country: "Spain",
    nights: 3,
    totalPaid: 600,
    isVerified: false,
  },
  {
    name: "Nina",
    country: "Canada",
    nights: 4,
    totalPaid: 1500,
    isVerified: false,
  },
  {
    name: "Oscar",
    country: "Canada",
    nights: 3,
    totalPaid: 950,
    isVerified: true,
  },
  {
    name: "Isabella",
    country: "Italy",
    nights: 3,
    totalPaid: 2000,
    isVerified: false,
  },
  {
    name: "Ethan",
    country: "USA",
    nights: 0,
    totalPaid: 200,
    isVerified: false,
  },
  {
    name: "Grace",
    country: "UK",
    nights: 7,
    totalPaid: 1800,
    isVerified: true,
  },
  {
    name: "Yuki",
    country: "Japan",
    nights: 3,
    totalPaid: 1000,
    isVerified: false,
  },
];

// Step 1: Find the guests from Canada
let canadianGuests = guests.filter(
  (guest) => guest.country === "Canada" && guest.isVerified
);

// Step 2: Sort the Canadian guests by their totalPaid
let sortcanadianGuestsByTotalPaid = canadianGuests.sort(
  (a, b) => b.totalPaid - a.totalPaid
);

// Step 3: Get the highest-paying verified guest => it will be the first element in the sorted list
let highestPayingVerifiedGuest = sortcanadianGuestsByTotalPaid[0];

// We will get the higest paying value
let higestPayingValue = highestPayingVerifiedGuest.totalPaid;

// Step 4: From the highest payment, we will get the guest that having the same payment
let result = sortcanadianGuestsByTotalPaid.filter(
  (guest) => guest.totalPaid === higestPayingValue
);

//short answer
/*const highestPayingVerifiedFromCanada = guests
    .filter((g) => g.country === "Canada" && g.isVerified)
    .sort((a, b) => b.totalPaid - a.totalPaid)[0];*/

/*2. Filter guests who:
Stayed at least 3 nights, AND
Paid more than $500, AND
Were not verified*/

// Step 1: Find all the guests Staying at least 3 nights
let guestsStayingAtLeast3Nights = guests.filter((guest) => guest.nights >= 3);
// Step 2: From the result in the step 1, find the guests who paid more than $500
let guestsPaidMoreThan500 = guestsStayingAtLeast3Nights.filter(
  (guest) => guest.totalPaid >= 500
);
// Step 3: From the result in the step 2, find the guests were not verified
let guestsNotVerified = guestsPaidMoreThan500.filter(
  (guest) => !guest.isVerified
);
//console.log(guestsNotVerified);

// Question 3. Map to show: name, nights, guestType based on total Paid
// Premium Guest vs Regular Guest
let guestsWithGuestType = guests.map((guest) => ({
  name: guest.name,
  nights: guest.nights,
  guestType: guest.totalPaid > 1000 ? "Premium" : "Regular",
}));
const categoryGuest = (totalPaid) => {
  if (totalPaid >= 1000) {
    return "Premium";
  } else {
    return "Regular";
  }
};
// let guestsWithGuestType = guests.map((guest) => ({
//   name: guest.name,
//   nights: guest.nights,
//   guestType: categoryGuest(guest.totalPaid),
// }));
// console.log(guestsWithGuestType);

