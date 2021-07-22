const tableName = "customertbl";
const mutableFields = ["name", "contactno", "address", "age"];

exports.createCustomertbl = () => {
  return `CREATE TABLE IF NOT EXISTS ${tableName}(id VARCHAR(60) PRIMARY KEY, name VARCHAR(20), contactno VARCHAR(20), 
            address VARCHAR(20), age INT,createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
};

exports.insertCustomer = (data) => {
  return `INSERT INTO ${tableName} (id, name, contactno, address, age) VALUES 
        ('${data.id}','${data.name}','${data.contactno}','${data.address}',${data.age})`;
};

exports.getCustomer = (id) => {
  return `SELECT * FROM ${tableName} WHERE id='${id}'`;
};

exports.getAll = () => {
  return `SELECT * FROM ${tableName}`;
};

exports.deleteCustomer = (data) => {
  const keys = Object.keys(data);
  return `DELETE FROM ${tableName} WHERE ${keys[0]}='${data.id}'`;
};

exports.updateCustomer = (data) => {
  const keys = Object.keys(data);

  const id = data.id;
  delete data.id;

  keys.forEach((el) => {
    if (!mutableFields.includes(el) || data[el] === null) {
      delete data[el];
    }
  });

  let string = Object.entries(data)
    .map((el) => {
      console.log(typeof el[1]);
      return `${el[0]} = ${
        typeof el[1] === "string" ? "'" + el[1] + "'" : el[1]
      }`;
    })
    .join(", ");
  string = `UPDATE ${tableName} SET ${string} WHERE id='${id}'`;
  console.log(string);
  return string;
};
