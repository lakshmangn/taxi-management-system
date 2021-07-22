const tableName = "drivertbl";
const mutableFields = ["name", "contactno", "address", "age"];

exports.createDrivertbl = () => {
  return `CREATE TABLE IF NOT EXISTS ${tableName}(id VARCHAR(60) PRIMARY KEY, name VARCHAR(20), contactno VARCHAR(20), 
            address VARCHAR(20), age INT, drivingLicense BOOLEAN,createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
};

exports.insertDriver = (data) => {
  return `INSERT INTO ${tableName} (id, name, contactno, address, age, drivingLicense) VALUES 
        ('${data.id}','${data.name}','${data.contactno}','${data.address}',${data.age},${data.drivingLicense})`;
};

exports.getDriver = (id) => {
  return `SELECT * FROM ${tableName} WHERE id='${id}'`;
};

exports.getAll = () => {
  return `SELECT * FROM ${tableName}`;
};

exports.deleteDriver = (data) => {
  const keys = Object.keys(data);
  return `DELETE FROM ${tableName} WHERE ${keys[0]}='${data.id}'`;
};

exports.updateDriver = (data) => {
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
