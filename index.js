// Your code here

const createEmployeeRecord = (employeeArray) => {
    let employee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

const createEmployeeRecords = (employeeArrays) => {
    return employeeArrays.map(employeeArray => createEmployeeRecord(employeeArray))
}

const createTimeInEvent = (employeeObj, dateStampStr) => {
    employeeObj.timeInEvents.push({
        type: 'TimeIn', 
        hour: parseInt(dateStampStr.split(' ')[1], 10),
        date: dateStampStr.split(' ')[0]
    })
    return employeeObj
}

const createTimeOutEvent = (employeeObj, dateStampStr) => {
    let [date, hour] = dateStampStr.split(' ')

    employeeObj.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    })
    return employeeObj
}

const hoursWorkedOnDate = (employeeObj, dateStr) => {
    let timeIn= employeeObj.timeInEvents.find( eventObj => (eventObj.date === dateStr))
    let timeOut= employeeObj.timeOutEvents.find( eventObj => (eventObj.date === dateStr))
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
}

const wagesEarnedOnDate = (employeeObj, dateStr) => {
    return hoursWorkedOnDate(employeeObj, dateStr) * employeeObj.payPerHour
}

const allWagesFor = (employeeObj) => {
    let dates = employeeObj.timeInEvents.map( event => event.date )
    let payable = dates.reduce((accumulator, date) => {
        return accumulator + wagesEarnedOnDate(employeeObj, date)
    }, 0)

    return payable
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    let foundRecord = srcArray.find( record => record.firstName === firstName)
    return foundRecord
}

const calculatePayroll = (employeeRecords) => {
    return employeeRecords.reduce((accumulator, record) => {
        return accumulator + allWagesFor(record)
    }, 0)
}