const tableName = "taxitbl";
const mutableFields = ["number", "model", "overview", "seatingCapacity"];

exports.createTaxitbl = () => {
  return `CREATE TABLE IF NOT EXISTS ${tableName}(id VARCHAR(60) PRIMARY KEY, ownerid VARCHAR(60), number VARCHAR(20) UNIQUE KEY, 
            model VARCHAR(20), overview VARCHAR(20), seatingCapacity INT,driverid VARCHAR(60))`;
};

exports.insertTaxi = (data) => {
  return `INSERT INTO ${tableName} (id, ownerid, number, model, overview, seatingCapacity, driverid) VALUES 
        ('${data.id}','${data.ownerid}','${data.number}','${data.model}','${data.overview}',${data.seatingCapacity},'${data.driverid}')`;
};

exports.getTaxi = (id) => {
  return `SELECT * FROM ${tableName} WHERE id='${id}'`;
};

exports.getByOwner = (id) => {
  return `SELECT * FROM ${tableName} WHERE ownerid='${id}'`;
};

exports.getByDriver = (id) => {
  return `SELECT * FROM ${tableName} WHERE driverid='${id}'`;
};

exports.getAll = () => {
  return `SELECT * FROM ${tableName}`;
};

exports.deleteTaxi = (data) => {
  const keys = Object.keys(data);
  return `DELETE FROM ${tableName} WHERE ${keys[0]}='${data.id}'`;
};

exports.updateTaxi = (data) => {
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
