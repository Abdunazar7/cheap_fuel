const db = require("../config/db.config");

const getBranchesByFuelTypeName = (req, res) => {
  const { name } = req.query;
  const searchPattern = `%${name}%`

  const query = `
SELECT 
  b.name AS branch_name,
  b.address,
  f.name AS fuel_name,
  gst.is_exists
FROM gas_station_branch b
LEFT JOIN gas_station_fuel_type gst 
  ON gst.gas_station_branch_id = b.id
LEFT JOIN fuel_types f 
  ON f.id = gst.fuel_type_id
WHERE gst.is_exists=TRUE AND f.name LIKE ?;
  `;

  db.query(query, [searchPattern], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting branches by fuel type name",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: `No branches found for fuel type with name like '${name}'`,
      });
    }

    res.json({
      statusCode: 200,
      message: "Branches retrieved successfully by fuel type name",
      data: result,
    });
  });
};

const getBranchesByGasStationName = (req, res) => {
  const { name } = req.query;
  const searchPattern = `%${name}%`

  const query = `
    SELECT gsb.name, gsb.address FROM  gas_station_branch gsb
    LEFT JOIN gas_station gs on gs.id=gsb.gas_station_id
    WHERE gs.name LIKE ?`;

  db.query(query, [searchPattern], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting branches by gas station name",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: `No branches found for gas station with name like '${name}'`,
      });
    }

    res.json({
      statusCode: 200,
      message: "Branches retrieved successfully",
      data: result,
    });
  });
};

const searchGasStationBranch = (req, res) => {
  const { name, address, phone_number } = req.query;

  let query = `SELECT * FROM gas_station_branch WHERE 1=1`;
  const params = [];

  if (name) {
    query += ` AND name LIKE ?`;
    params.push(`%${name}%`);
  }

  if (address) {
    query += ` AND address LIKE ?`;
    params.push(`%${address}%`);
  }

  if (phone_number) {
    query += ` AND phone_number LIKE ?`;
    params.push(`%${phone_number}%`);
  }

  db.query(query, params, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error searching Gas Station Branch",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "No Gas Station Branch found with given criteria",
      });
    }

    res.json({
      statusCode: 200,
      message: "Gas Station Branch search successful",
      data: result,
    });
  });
};

// Create
const createGasStationBranch = (req, res) => {
  const { gas_station_id, name, address, location, phone_number } = req.body;
  const query = `
    INSERT INTO gas_station_branch (gas_station_id, name, address, location, phone_number) 
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [gas_station_id, name, address, location, phone_number],
    (error, results) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error adding Gas Station Branch" });
      res.status(201).json({
        statusCode: 201,
        message: "Gas Station Branch added",
        id: results.insertId,
      });
    }
  );
};

// Get all
const getGasStationBranches = (req, res) => {
  db.query(`SELECT * FROM gas_station_branch`, (error, result) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Error retrieving Gas Station Branches" });
    res.json({
      statusCode: 200,
      message: "Gas Station Branches retrieved successfully",
      data: result,
    });
  });
};

// Get one
const getOneGasStationBranch = (req, res) => {
  const { id } = req.params;
  db.query(
    `SELECT * FROM gas_station_branch WHERE id = ?`,
    [id],
    (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error retrieving Gas Station Branch" });
      if (!result.length)
        return res
          .status(404)
          .json({ message: "Gas Station Branch not found" });
      res.json({
        statusCode: 200,
        message: "Gas Station Branch retrieved successfully",
        data: result[0],
      });
    }
  );
};

// Update
const updateGasStationBranch = (req, res) => {
  const { id } = req.params;
  const { gas_station_id, name, address, location, phone_number } = req.body;
  const query = `
    UPDATE gas_station_branch SET gas_station_id=?, name=?, address=?, location=?, phone_number=? WHERE id=?
  `;
  db.query(
    query,
    [gas_station_id, name, address, location, phone_number, id],
    (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error updating Gas Station Branch" });
      res.json({
        statusCode: 200,
        message: "Gas Station Branch updated successfully",
        affected: result.affectedRows,
      });
    }
  );
};

// Delete
const deleteGasStationBranch = (req, res) => {
  const { id } = req.params;
  db.query(
    `DELETE FROM gas_station_branch WHERE id = ?`,
    [id],
    (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error deleting Gas Station Branch" });
      res.json({
        statusCode: 200,
        message: "Gas Station Branch deleted successfully",
        affected: result.affectedRows,
      });
    }
  );
};

module.exports = {
  createGasStationBranch,
  getGasStationBranches,
  getOneGasStationBranch,
  updateGasStationBranch,
  deleteGasStationBranch,
  searchGasStationBranch,
  getBranchesByGasStationName,
  getBranchesByFuelTypeName,
};
