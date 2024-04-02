(async function () {
    const data = await fetch("./src/data.json");
    const res = await data.json();
    let employees = res;
    const employeeList = document.querySelector(".employees__names--list");
    const employeeInfo = document.querySelector(".employees__single--info");
    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee_create");

    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];
    createEmployee.addEventListener("click", () => {
        addEmployeeModal.style.display = "flex";
    });

    addEmployeeModal.addEventListener("click", (e) => {
        if (e.target.className === "addEmployee") {
            addEmployeeModal.style.display = "none";
        }
    });


    // Set Employee age to be entered minimum 18 years
    const dobInput = document.querySelector(".addEmployee_create--dob");
    dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`

    addEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(addEmployeeForm);
        const values = [...formData.entries()];
        let empData = {};
        values.forEach((val) => {
            empData[val[0]] = val[1];
        });
        empData.id = employees[employees.length - 1].id + 1;
        empData.age =
            new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
        empData.imageUrl =
            empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        employees.push(empData);
        renderElement();
        addEmployeeForm.reset();
        addEmployeeModal.style.display = "none";
    });
    
    employeeList.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
            selectedEmployeeId = e.target.id;
            renderElement();
            renderSingleEmployee();
        }
        if (e.target.tagName === "I") {
            employees = employees.filter(
                (emp) => String(emp.id) !== e.target.parentNode.id
            );
            if (String(selectedEmployeeId) === e.target.parentNode.id) {
                selectedEmployeeId = employees[0]?.id || -1;
                selectedEmployee = employees[0] || {};
                renderSingleEmployee();
            }
            renderElement();
        }
    });

    const renderElement = () => {
        employeeList.innerHTML = "";
        employees.forEach(element => {
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
        if (selectedEmployeeId === -1) {
            employeeInfo.innerHTML = "";
            return;
        }
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