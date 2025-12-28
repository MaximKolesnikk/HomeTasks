//First Task
function addParamsToRequest(params) {
  let count = 0;

  return function (sendData) {
    count++;

    return {
      ...params,
      data: sendData,
      count,
    };
  };
}

const sendDataFunc = addParamsToRequest({ access_token: "token" });

console.log(sendDataFunc({ name: "Vika" }));
console.log(sendDataFunc([{ id: 1 }, { id: 2 }]));
console.log(sendDataFunc({}));

//Second task
const obj = {
  name: "Alice",
  age: 25,
  getData: function () {
    console.log(`Person name is: ${this.name} and age ${this.age}`);
  },
};

function bind(func, context) {
  return function (...args) {
    return func.apply(context, args);
  };
}

const boundGetData = bind(obj.getData, obj);

boundGetData();
boundGetData();

//Third task
const root = {
  name: "name",

  type: "folder",

  children: [
    {
      name: "folder 1",

      type: "folder",

      children: [
        {
          name: "folder 2",

          type: "folder",

          children: [
            {
              name: "file 3",

              type: "file",

              size: 30,
            },
          ],
        },
      ],
    },

    {
      name: "file 1",

      type: "file",

      size: 10,
    },

    {
      name: "file 2",

      type: "file",

      size: 20,
    },
  ],
};

function getFileNames(node) {
  if (node.type === "file") {
    return [node.name];
  }

  if (!node.children || node.children.length === 0) {
    return [];
  }

  let fileNames = [];
  for (const child of node.children) {
    fileNames = fileNames.concat(getFileNames(child));
  }

  return fileNames;
}

const fileNames = getFileNames(root);
console.log(fileNames);

//Fourth task

// ES 6
class Human {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  introduce() {
    console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
  }
}

class Student extends Human {
  constructor(name, phone, course) {
    super(name, phone);
    this.course = course;
  }

  study() {
    console.log(`Я навчаюсь на ${this.course} курсі.`);
  }
}

class Teacher extends Human {
  constructor(name, phone, subject) {
    super(name, phone);
    this.subject = subject;
  }

  teach() {
    console.log(`Я викладаю ${this.subject}.`);
  }
}

const student = new Student("Олег", "+380123456789", 3);
const teacher = new Teacher("Марія Петрівна", "+380987654321", "JavaScript");

student.introduce();
student.study();
teacher.introduce();
teacher.teach();

// Prototype
function HumanProto(name, phone) {
  this.name = name;
  this.phone = phone;
}

HumanProto.prototype.introduce = function () {
  console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
};

function StudentProto(name, phone, course) {
  HumanProto.call(this, name, phone);
  this.course = course;
}

StudentProto.prototype = Object.create(HumanProto.prototype);
StudentProto.prototype.constructor = StudentProto;

StudentProto.prototype.study = function () {
  console.log(`Я навчаюсь на ${this.course} курсі.`);
};

function TeacherProto(name, phone, subject) {
  HumanProto.call(this, name, phone);
  this.subject = subject;
}

TeacherProto.prototype = Object.create(HumanProto.prototype);
TeacherProto.prototype.constructor = TeacherProto;

TeacherProto.prototype.teach = function () {
  console.log(`Я викладаю ${this.subject}.`);
};

const studentproto = new StudentProto("Олег", "+380123456789", 3);
const teacherproto = new TeacherProto(
  "Марія Петрівна",
  "+380987654321",
  "JavaScript"
);

studentproto.introduce();
studentproto.study();

teacherproto.introduce();
teacherproto.teach();
