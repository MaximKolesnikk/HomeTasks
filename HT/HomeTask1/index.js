//First Task
//example 1
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
// example 2

let FirstTaskWhile = 0;
while (FirstTaskWhile <= 10) {
  console.log(FirstTaskWhile);
  FirstTaskWhile++;
}
//Second Task
// example 1
const arraySecondTask = [
  1,
  "yes",
  true,
  null,
  15,
  undefined,
  6,
  "thanks",
  7,
  false,
  "no",
];
arraySecondTask.forEach((item, index, array) => {
  console.log(typeof item);
});
// example 2
for (let i = 0; i < arraySecondTask.length; i++) {
  console.log(typeof arraySecondTask[i]);
}
// example 3
let iForWhile = 0;
while (iForWhile < arraySecondTask.length) {
  console.log(typeof arraySecondTask[iForWhile]);
  iForWhile++;
}
// example 4
let iForDoWhile = 0;
do {
  console.log(typeof arraySecondTask[iForDoWhile]);
  iForDoWhile++;
} while (iForDoWhile < arraySecondTask.length);

//Third Task
let ThirdTaskArray = [
  { name: "Sasha", age: 10 },
  { name: "Petya", age: 21 },
  { name: "Danya", age: 15 },
  { name: "Masha", age: 41 },
  { name: "Rita", age: 67 },
];
console.log(ThirdTaskArray.filter((item) => item.age > 20));

//Fourth task
let FourthTaskArrayWithPets = ThirdTaskArray.map((person, index) => {
  const pets = ["cat", "dog", "camel", "elephant", "tiger"];
  const pet = pets[index % pets.length];

  return {
    ...person,
    pet: pet,
  };
});
console.log(FourthTaskArrayWithPets);

//Fifth task
//example 1
let FifthTaskArray = [];
for (let i = 0; i < 10; i++) {
  FifthTaskArray.push(42);
}
console.log(FifthTaskArray);
//example 2
FifthTaskArray.splice(5, 1, "answer");

console.log(FifthTaskArray);

console.log(FifthTaskArray.find((item) => item == "answer"));

//sixth task
let person = {
  name: "Alina",
  age: 31,
  hobby: "sport",
};
console.log(Object.keys(person));
console.log(person.hasOwnProperty("age"));
const values = Object.values(person);
console.log(values);
