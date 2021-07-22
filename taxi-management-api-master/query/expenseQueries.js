const tableName = "expensetbl";
const mutableFields = ["description", "amount"];

exports.createExpensetbl = () => {
  return `CREATE TABLE IF NOT EXISTS ${tableName}(id VARCHAR(60) PRIMARY KEY, descritpion VARCHAR(30), taxiid VARCHAR(60), 
            transactionid VARCHAR(60), amount INT, driverid VARCHAR(60),createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
};

exports.insertExpense = (data) => {
  return `INSERT INTO ${tableName} (id, descritpion, taxiid, transactionid, amount, driverid) VALUES 
        ('${data.id}','${data.descritpion}','${data.taxiid}','${data.transactionid}',${data.amount},'${data.driverid}')`;
};

exports.updateExpense = (data) => {
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

exports.deleteExpense = (data) => {
  const keys = Object.keys(data);
  return `DELETE FROM ${tableName} WHERE ${keys[0]}='${data.id}'`;
};

exports.getExpense = (id) => {
  return `SELECT * FROM ${tableName} WHERE id='${id}'`;
};

exports.getAll = () => {
  return `SELECT * FROM ${tableName}`;
};
