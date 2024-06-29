import inquirer from "inquirer";
class student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = []; // initiallize an empty array for courses
        this.balance = 100;
    }
    //method the endroll a student in a courses 
    endroll_course(courses) {
        this.courses.push(courses);
    }
    //view a student balances
    view_balance() {
        console.log(`Balance for${this.name} : ${this.balance}`);
    }
    //method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(` ${amount}fees paid successfully for ${this.name} `);
    }
    //method to disply student status
    show_ststus() {
        console.log(`ID: ${this.id}`);
        console.log(`NAME : ${this.name}`);
        console.log(`Courses : ${this.courses}`);
        console.log(`Balance : ${this.balance}`);
    }
}
//definig a student manager
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //add new student
    add_student(name) {
        let Student = new student(name);
        this.students.push(Student);
        console.log(`student : ${name} added successfully . student ID: ${Student.id}`);
    }
    //method to endroll a student in courses
    enroll_student(student_id, courses) {
        let student = this.find_student(student_id);
        if (student) {
            student.endroll_course(courses);
            console.log(`${student.name} endroll in ${courses} successfully`);
        }
    }
    //method to view student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("student not found please enter a correct student id");
        }
    }
    //method to pay stiudent fees 
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("student not found please enter a correct student id");
        }
    }
    //method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_ststus();
        }
    }
    // method to find student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//main function to run the program
async function main() {
    console.log("welcome to student management system");
    let student_manager = new Student_manager();
    //while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select an option",
                choices: [
                    "Add student",
                    "Enroll student",
                    "View student balance",
                    "pay fees",
                    "Show status",
                    "Exit"
                ]
            }
        ]);
        //using switch case to handle user  choice
        switch (choice.choice) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: " input",
                        message: "enter a student name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student id",
                        type: "number",
                        message: "enter a student id",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "enter a course name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "pay fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter a amount to pay",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter astudent id",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
//calling a main function
main();
