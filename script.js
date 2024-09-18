document.getElementById('calcType').addEventListener('change', function() {
    const midtermContainer = document.getElementById('midtermDateContainer');
    if (this.value === 'midterm') {
        midtermContainer.style.display = 'block';
    } else {
        midtermContainer.style.display = 'none';
    }
});

function calculateAttendance() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const midTermDate = document.getElementById('midTermDate').value ? new Date(document.getElementById('midTermDate').value) : null;
    const currentDate = new Date(document.getElementById('currentDate').value);
    const presentPercent = parseFloat(document.getElementById('presentPercent').value);
    const absentPercent = 100 - presentPercent; // Automatically calculate absent percentage
    const classesPerWeek = parseInt(document.getElementById('classesPerWeek').value);
    
    const calcType = document.getElementById('calcType').value;
    let totalDays, remainingDays, expectedAttendance;
    
    // Calculate the total days based on selection (Semester or Mid Term)
    if (calcType === 'midterm' && midTermDate) {
        totalDays = Math.floor((midTermDate - startDate) / (1000 * 60 * 60 * 24));
        remainingDays = Math.floor((midTermDate - currentDate) / (1000 * 60 * 60 * 24));
    } else {
        totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        remainingDays = Math.floor((endDate - currentDate) / (1000 * 60 * 60 * 24));
    }

    // Calculate classes attended and missed till the current date
    const totalClasses = (totalDays / 7) * classesPerWeek;  // Total classes till now
    const completedClasses = (Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) / 7) * classesPerWeek;
    const attendedClasses = (presentPercent / 100) * completedClasses;
    const missedClasses = (absentPercent / 100) * completedClasses;

    // Calculate expected remaining attendance for future classes
    const remainingClasses = (remainingDays / 7) * classesPerWeek;
    const totalExpectedClasses = completedClasses + remainingClasses;

    // Expected attendance by considering current attendance
    expectedAttendance = ((attendedClasses + remainingClasses) / totalExpectedClasses) * 100;

    // Display the output
    const attendanceOutput = document.getElementById('attendanceOutput');
    if (calcType === 'midterm') {
        attendanceOutput.textContent = `Your expected attendance by mid term is ${expectedAttendance.toFixed(2)}%.`;
    } else {
        attendanceOutput.textContent = `Your expected attendance by the end of the semester is ${expectedAttendance.toFixed(2)}%.`;
    }
}