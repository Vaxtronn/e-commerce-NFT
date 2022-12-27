const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "buy",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      contract: {
        type: DataTypes.STRING,
        // allowNull: false, //despues hacer force y borrar esta linea. Podria ser nula
      },
      statusPay: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["Created", "Pending", "Rejected", "Successed"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
      payMethod: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["MercadoPago", "Metamask"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
