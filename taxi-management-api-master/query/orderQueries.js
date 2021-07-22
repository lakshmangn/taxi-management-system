const tableName = "ordertbl";
const mutableFields = ["pickupAdd", "destinationAdd", "amount"];

exports.createOrdertbl = () => {
  return `CREATE TABLE IF NOT EXISTS ${tableName}(id VARCHAR(60) PRIMARY KEY, pickupAdd VARCHAR(50), destinationAdd VARCHAR(50), 
            customerid VARCHAR(60), amount DOUBLE, transactionid VARCHAR(60),createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
};

exports.insertOrder = (data) => {
  return `INSERT INTO ${tableName} (id, destinationAdd, pickupAdd, customerid, amount, transactionid) VALUES 
        ('${data.id}','${data.destinationAdd}','${data.pickupAdd}','${data.customerid}',${data.amount},'${data.transactionid}')`;
};

exports.getOrder = (id) => {
  return `SELECT * FROM ${tableName} WHERE id='${id}'`;
};

exports.getAll = () => {
  return `SELECT * FROM ${tableName}`;
};

exports.deleteOrder = (data) => {
  const keys = Object.keys(data);
  return `DELETE FROM ${tableName} WHERE ${keys[0]}='${data.id}'`;
};

exports.updateOrder = (data) => {
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
