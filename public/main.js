$(document).ready(initApp);

function initApp(){
    console.log('App Initialized');
    $('#add-form').on('submit', submitFormData);
    getStudents();
    
};

function submitFormData(e){
    e.preventDefault();
    
    console.log('App initialized');

    const name = $('#name');
    const course = $('#course');
    const grade = $('#grade');

    addStudent(name.val(), course.val(), grade.val());

    name.val('');
    course.val('');
    grade.val('');
    
}

function getStudents(){
    const config = {
        url: '/api/students',
        success: resp => {
            console.log('Response:', resp);
            addStudentsToDom(resp.students);
        }
    }
    
    
    $.ajax(config);
};

function addStudentsToDom(students){
    const studentElements = [];
    const tbody = $('#student-data');
    tbody.html('');
    students.forEach(student => {
        const tr = $('<tr>');
        const name = $('<td>', {text: student.name});
        const course = $('<td>', {text: student.course});
        const grade = $('<td>', {text: student.grade});
        

        tbody.text('');

        tr.append(name, course, grade);

        studentElements.push(tr);
    });

    tbody.append(studentElements);

};

function addStudent(name, course, grade){
    $.ajax({
        method: 'POST',
        url: '/api/students',
        data: {
            name: name,
            course: course,
            grade: grade
        },
        success: (resp) => {
            console.log('Student Added:', resp);
            getStudents();
        },
    })
}