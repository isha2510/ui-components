(async function () {
    const data = await fetch("./src/data.json");
    const res = await data.json();
    const employeeList = document.querySelector(".employees__names--list");
    const employeeInfo = document.querySelector(".employees__single--info");
    let selectedEmployeeId = res[0].id;
    let selectedEmployee = res[0];
    employeeList.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
            selectedEmployeeId = e.target.id;
            renderElement();
            renderSingleEmployee();
        }
    })
    const renderElement = () => {
        employeeList.innerHTML = "";
        res.forEach(element => {
            const employee = document.createElement("span");
            employee.classList.add("employees__names--item");
            if (parseInt(selectedEmployeeId, 10) === element.id) {
                employee.classList.add("selected");
                selectedEmployee = element;
            }
            employee.setAttribute("id", element.id);
            employee.innerHTML = `${element.firstName} ${element.lastName} <i class="employeeDelete">❌</i>`;
            employeeList.append(employee);
        });
    }

    const renderSingleEmployee = () => {
        employeeInfo.innerHTML = `
        <img src="${selectedEmployee.imageUrl}"/>
        <span class="employees__single--heading">
        ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
        </span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
      `;
    }
    renderElement();
    if (selectedEmployee) renderSingleEmployee();
})();