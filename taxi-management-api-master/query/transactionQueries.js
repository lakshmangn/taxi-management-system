const tableName = "transactiontbl";
const mutableFields = ["description", "type", "amount"];

exports.createTransactionTable = () => {
  return `CREATE TABLE IF NOT EXISTS ${tableName}(id VARCHAR(60) PRIMARY KEY, type VARCHAR(20), description VARCHAR(20), 
        amount INT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
};

exports.insertTransaction = (data) => {
  return `INSERT INTO ${tableName} (id, type, description, amount) VALUES 
        ('${data.id}','${data.type}','${data.description}',${data.amount})`;
};

exports.getTransaction = (id) => {
  return `SELECT * FROM ${tableName} WHERE id='${id}'`;
};

exports.getAll = () => {
  return `SELECT * FROM ${tableName}`;
};

exports.updateTransaction = (data) => {
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
