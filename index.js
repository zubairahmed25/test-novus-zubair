

const data = [
  { name: "Adam", age: 20, salary: 30100 },
  { name: "Bob", age: 60, salary: 102000 },
  { name: "Carla", age: 31, salary: 57000 },
  { name: "Dave", age: 42, salary: 22000 },
  { name: "Ethel", age: 80, salary: 91000 },
  { name: "Frank", age: 28, salary: 73000 },
  { name: "Gina", age: 21, salary: 16000 }
];

const maxAge = Object.keys(data).reduce(
  (acc, curr) =>
    acc.age ? (data[curr].age > acc.age ? data[curr] : acc) : data[curr],
  {}
).age;

const ageArr = data
  .map((record) => {
    record.percent = (record.age / maxAge) * 100;
    return record;
  })
  .sort((a, b) => b.percent - a.percent);

const maxSalary = Object.keys(data).reduce(
  (acc, curr) =>
    acc.age ? (data[curr].salary > acc.salary ? data[curr] : acc) : data[curr],
  {}
).salary;

const salaryArr = [...data]
  .map((record) => {
    record.percent = (record.salary / maxSalary) * 100;
    return record;
  })
  .sort((a, b) => b.percent - a.percent);

const displayChart = (value, index, param) => {
  $("#chart").append(
    `<li title='${value.percent}'><span class="name">${value.name}</span><span class="bar"></span><span class="values">${param}</span></li>`
  );
  $(`#chart li:nth-child(${index + 1})`).css(`width`, `${value.percent}%`);
  $(`#chart li:nth-child(${index + 1})`).css("background", "blue");
  $(`#chart li:nth-child(${index + 1})`)
    .children(".bar")
    .animate({ width: value.percent + "%" }, 500);
};
$(function () {
  var value = "age";
  $("#mySelect").on("change", function () {
    value = $(this).val();
    $("#chart").children().remove();
    console.log(value);

    value === "age"
      ? $.each(ageArr, function (index, value) {
          displayChart(value, index, value.age);
        })
      : value === "salary"
      ? $.each(salaryArr, function (index, value) {
          displayChart(value, index, value.salary);
        })
      : console.log("none");
  });
});
