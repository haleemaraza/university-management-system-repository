import inquirer from "inquirer"
import prompt from "inquirer/lib/ui/prompt.js";

class Student {
    constructor(
        public id: number,
        public name: string,
        public age: number,
        public grade: string
        ) {}
    }

 // store students records
 let students:Student[]=[];


 //    student  Registration 
 async function registerStudent(): Promise<void> {
    let answers = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter student name"
            },
            {
                type: "number",
                name: "age",
                message: "Enter student age "
            },
            {
                type: "input",
                name: "grade",
                message: "Enter student grade",
            }
        ])
        let id = students.length + 10001
        let newStudent = new Student(id,
             answers.name, answers.age, answers.grade);
        students.push(newStudent);
        console.log(`Student ${answers.name} registered with ID: ${id}`)
    }

//  view student details
function viewStudentDetails(): void {
    console.log('Student Details:');
    students.forEach((student) => {
      console.log(` ID: ${student.id} \t \n Name: ${student.name}\t \n Age: ${student.age}\t  \n Grade: ${student.grade}`);
    });
  }

  //  update student information 
    async function updateStudentInformation():Promise<void> {
        let answers = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter student ID to update:"
            },
            {
                type: "input",
                name: "newName",
                message: "Enter new name :"
            },
            {
                type: "number",
                name: "newAge",
                message: "Enter new age :"
            },
            {
                type: "input",
                name: "newGrade",
                message: "Enter new grade :"
            }
       ]);

       const studentIndex = students.findIndex((student) => student.id === answers.id);
       if (studentIndex !== 9999) {
         students[studentIndex].name = answers.newName;
         students[studentIndex].age = answers.newAge;
         students[studentIndex].grade = answers.newGrade;
         console.log(`Student information updated for ID: ${answers.id}`);
       } else {
         console.log(`Student with ID ${answers.id} not found`);
       }
    }

    // delete student record 
     async function deleteStudentRecord(): Promise<void> {
        let answers = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter student ID to delete : "
            },
        ]);
        let initialLength = students.length;
        students = students.filter((student) => student.id !== answers.id);

        if (students.length < initialLength){
            console.log(`Student with ID ${answers.id} deleted successfully`);
        } else {
            console.log(`Student with ID ${answers.id} not found`)
        }
    }

 //main
    async function studentManagement(): Promise<void> {
        while(true) {
            let action = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Choose an action:',
                    choices: ['Register Student', 'View Student Details', 'Update Student Information', 'Delete Student Record', 'Exit'],  
                },
            ]);

            switch (action.action){
                case "Register Student":
                    await registerStudent();
                    break;
                case "View Student Details":
                    await viewStudentDetails();
                    break;
                case "Update Student Information":
                    await updateStudentInformation();
                    break;
                  case "Delete Student Record":
                    await deleteStudentRecord();
                    break;
                  case "Exit":
                    console.log('Exiting...');
                    process.exit();
            }
        }
    }     

//  course management

class Course {
       constructor(public name: string, public cost:number) {}
    }

   let courses :Course[]= [];
   
 // course register    
    async function registerCourse(): Promise<void> {
        let answers = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter course name:",
            },
            {
                type: "number",
                name: "cost",
                message: "Enter course cost:"
            }
        ]);

        let newCourse = new Course(answers.name, answers.cost);
        courses.push(newCourse);
        console.log(`Course ${answers.name} registered with cost $${answers.cost}`);
    }

 // veiw course details
    function viewCourseDetails(): void {
        console.log('Course Details:');
        courses.forEach((course) => {
          console.log(`Name: ${course.name}, Cost: $${course.cost}`);
        });
      }
 // update course information  
      async function updateCourseInformation(): Promise<void> {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Enter course name to update:',
          },
          {
            type: 'number',
            name: 'newCost',
            message: 'Enter new course cost:',
          },
        ]);

        let course = findCourse(answers.name);2

        if(course) {
            course.cost = answers.newCost;
            console.log(`Course information updated for ${answers.name}`)
        }else{
            console.log(`Course ${answers.name} not found`)
        }
    }    
 // delete course
 async function deleteCourseRecord(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter course name to delete:',
      },
    ]);
  
    const initialLength = courses.length;
    courses = courses.filter((course) => course.name !== answers.name);
  
    if (courses.length < initialLength) {
      console.log(`Course ${answers.name} deleted successfully`);
    } else {
      console.log(`Course ${answers.name} not found`);
    }
  }
  
  function findCourse(courseName: string): Course | undefined {
    return courses.find((course) => course.name === courseName);
  }
  
//   main
  async function courseManagementMenu(): Promise<void> {
    while (true) {
      const action = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Choose an action:',
          choices: ['Register Course', 'View Course Details', 'Update Course Information', 'Delete Course Record', 'exist'],
        },
      ]);
  
      switch (action.action) {
        case 'Register Course':
          await registerCourse();
          break;
        case 'View Course Details':
          viewCourseDetails();
          break;
        case 'Update Course Information':
          await updateCourseInformation();
          break;
        case 'Delete Course Record':
          await deleteCourseRecord();
          break;
        case 'exist':
          console.log('Exiting...');
          process.exit();
      }
    }
  }



//faculty management

class FacultyMember {
  constructor(public name: string, public designation: string) {}
}

const facultyMembers: FacultyMember[] = [];

function addFacultyMember(): void {inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the faculty member\'s name:',
      },
      {
        type: 'input',
        name: 'designation',
        message: 'Enter the faculty member\'s designation:',
      },
    ])
    .then((answers) => {
      const newFacultyMember = new FacultyMember(answers.name, answers.designation);
      facultyMembers.push(newFacultyMember);
      console.log('Faculty member added successfully!');
    });
}

function viewFacultyDetails(): void {
  console.log('Faculty Members:');
  console.table(facultyMembers);
}

function updateFacultyInformation(): void {inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the faculty member\'s name to update information:',
      },
    ])
    .then((answers: { name: string }) => {
      const facultyIndex = facultyMembers.findIndex((faculty) => faculty.name === answers.name);
      if (facultyIndex !== -1) {inquirer.prompt([
            {
              type: 'input',
              name: 'designation',
              message: 'Enter the updated designation:',
            },
          ])
          .then((updatedInfo: { designation: string }) => {
            facultyMembers[facultyIndex] = { ...facultyMembers[facultyIndex], ...updatedInfo };
            console.log('Faculty information updated successfully!');
          });
      } else {
        console.log('Faculty member not found!');
      }
    });
}

function removeFacultyMember(): void {inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the faculty member\'s name to remove:',
      },
    ])
    .then((answers: { name: string }) => {
      const facultyIndex = facultyMembers.findIndex((faculty) => faculty.name === answers.name);
      if (facultyIndex !== -1) {
        facultyMembers.splice(facultyIndex, 1);
        console.log('Faculty member removed successfully!');
      } else {
        console.log('Faculty member not found!');
      }
    });
}

function facultyManagement(): void {inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: ['Add Faculty Member', 'View Faculty Details', 'Update Faculty Information', 'Remove Faculty Member', 'Exit'],
      },
    ])
    .then((answers: { action: string }) => {
      switch (answers.action) {
        case 'Add Faculty Member':
          addFacultyMember();
          break;
        case 'View Faculty Details':
          viewFacultyDetails();
          break;
        case 'Update Faculty Information':
          updateFacultyInformation();
          break;
        case 'Remove Faculty Member':
          removeFacultyMember();
          break;
        case 'Exit':
          console.log('Exiting the Faculty Management System. Goodbye!');
          break;
      }
    });
}




// enroll
const enrolledStudents: any[] = [];

// Function to enroll a student in a course
function enrollStudent() {inquirer.prompt([
      {
        type: 'input',
        name: 'studentName',
        message: 'Enter the student\'s name:',
      },
      {
        type: 'input',
        name: 'courseName',
        message: 'Enter the course name:',
      },
    ])
    .then((answers: any) => {
      enrolledStudents.push(answers);
      console.log('Student enrolled successfully!');
    });
}

// Function to view enrolled students for a course
function viewEnrolledStudents() {
  console.log('Enrolled Students:');
  console.table(enrolledStudents);
}

// Function to remove a student from a course
function removeStudentFromCourse() {inquirer.prompt([
      {
        type: 'input',
        name: 'studentName',
        message: 'Enter the student\'s name to remove from the course:',
      },
      {
        type: 'input',
        name: 'courseName',
        message: 'Enter the course name:',
      },
    ])
    .then((answers: any) => {
      const enrollmentIndex = enrolledStudents.findIndex(
        (enrollment) => enrollment.studentName === answers.studentName && enrollment.courseName === answers.courseName
      );

      if (enrollmentIndex !== -1) {
        enrolledStudents.splice(enrollmentIndex, 1);
        console.log('Student removed from the course successfully!');
      } else {
        console.log('Student not found in the course!');
      }

    });
}

// Main function for student enrollment management
function studentEnrollmentManagement() {inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: ['Enroll Student', 'View Enrolled Students', 'Remove Student from Course', 'Exit'],
      },
    ])
    .then((answers: { action: any }) => {
      switch (answers.action) {
        case 'Enroll Student':
          enrollStudent();
          break;
        case 'View Enrolled Students':
          viewEnrolledStudents();
          break;
        case 'Remove Student from Course':
          removeStudentFromCourse();
          break;
        case 'Exit':
          console.log('Exiting the Student Enrollment System. Goodbye!');
          break;
      }
    });
}


// grade and result
interface StudentGrade {
  studentName: string;
  courseName: string;
  grade: number;
}

const studentGrades: StudentGrade[] = [];

async function enterStudentGrades(): Promise<void> {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'studentName',
        message: 'Enter the student\'s name:',
      },
      {
        type: 'input',
        name: 'courseName',
        message: 'Enter the course name:',
      },
      {
        type: 'input',
        name: 'grade',
        message: 'Enter the student\'s grade:',
      },
    ]);

    studentGrades.push(answers as StudentGrade);
    console.log('Student grade entered successfully!');
  } catch (error:any) {
    console.error('An error occurred while entering student grades:', (Error as unknown as Error).message);
  }
}

async function calculateAndDisplayResult(): Promise<void> {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'studentName',
        message: 'Enter the student\'s name to calculate and display the result:',
      },
    ]);

    const studentName = answers.studentName;

    const studentGrade = studentGrades.find((entry) => entry.studentName === studentName);

    if (studentGrade) {
      const result = calculateResult(studentGrade.grade);
      console.log(`Result for ${studentName}: ${result}`);
    } else {
      console.log('Student not found!');
    }

  } catch (error: any) {
    console.error('An error occurred while calculating and displaying the result:', (Error as unknown as Error).message);
  }
}

async function generateGradeReports(): Promise<void> {
  try {
    console.log('Grade Reports:');
    console.table(studentGrades);
  } catch (error:any) {
    console.error('An error occurred while generating grade reports:', (Error as unknown as Error).message);
  }
}

function calculateResult(grade: number): string {

  return grade >= 60 ? 'Pass' : 'Fail';
}

async function gradeAndResultManagement(): Promise<void> {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: ['Enter Student Grades', 'Calculate and Display Result', 'Generate Grade Reports', 'Exit'],
      },
    ]);

    switch (answers.action) {
      case 'Enter Student Grades':
        await enterStudentGrades();
        break;
      case 'Calculate and Display Result':
        await calculateAndDisplayResult();
        break;
      case 'Generate Grade Reports':
        await generateGradeReports();
        break;
      case 'Exit':
        console.log('Exiting the Grade and Result Management System. Goodbye!');
        break;
    }
  } catch (error:any) {
    console.error('An error occurred in the grade and result management system:', (Error as unknown as Error).message);
  }
}



// FINAL
async function mainMenu(): Promise<void> {
    while (true) {
      const action = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Choose an action:',
          choices: ['Student Management', 'Course Management','Faculty Management','Enrollment','Grade and Result', 'Exit'],
        },
      ]);
  
      switch (action.action) {
        case 'Student Management':
          await studentManagement(); 
          await registerStudent();
          await viewStudentDetails();
          await updateStudentInformation();
          await deleteStudentRecord();
          await exit()
          break;
        case 'Course Management':
          await courseManagementMenu();
          await registerCourse();
          await viewCourseDetails();
          await updateCourseInformation();
          await deleteCourseRecord();
          await exit()
          break;
        case 'Faculty Management':
          await facultyManagement();
          await addFacultyMember(); 
          await viewFacultyDetails();
          await removeFacultyMember();
          await exit();
          break;
        case 'Enrollment':
          await studentEnrollmentManagement();
          await enrollStudent();
          await viewEnrolledStudents();
          await removeStudentFromCourse();
          await exit();
          break
        case 'Grade and Result':
          await gradeAndResultManagement();
          await enterStudentGrades();
          await calculateAndDisplayResult(); 
          await generateGradeReports();
          await exit()
          break
        case 'Exit':
          console.log('Exiting...');
          process.exit();
      }
    }
  }
  
  
  console.log('Welcome to the Faculty Management System!');
  
  mainMenu();

function exit() {
  throw new Error("Function not implemented.");
}
  