const data = {
  id: 3,
  name: "Rambha Apsara",
  contactno: "8912226761",
  address: "Tamilnadu",
  age: 18,
  some: "fake",
  no: "need",
};

const mutableFields = ["name", "contactno", "address", "age"];

const keys = Object.keys(data);

keys.forEach((el) => {
  if (!mutableFields.includes(el)) {
    delete data[el];
  }
});

const id = data.id;
delete data.id;
let string = Object.entries(data)
  .map((el) => {
    console.log(typeof el[1]);
    return `${el[0]} = ${
      typeof el[1] === "string" ? "'" + el[1] + "'" : el[1]
    }`;
  })
  .join(", ");
string = `UPDATE tablename SET ${string} WHERE id=${id}`;
console.log(string);
