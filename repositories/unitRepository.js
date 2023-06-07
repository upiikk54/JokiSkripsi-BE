const {
    units
} = require("../models")

class brandRepository {
    static async handleCreateUnit({
        userId,
        unitName
    }) {

        const createdUnit = units.create({
            userId,
            unitName
        });

        return createdUnit;
    };

    static async handleUpdateUnit({
        id,
        unitName,
    }) {

        const updatedUnit = await units.update({
            unitName
        }, {
            where: {
                id
            }
        });

        return updatedUnit;
    };

    static async handleDeleteUnit({ id }) {

        const deleteUnit = await units.destroy({ where: { id } });

        return deleteUnit;
    
    };

    static async handleGetUnitById({
        id
    }) {
        const getUnitById = await units.findOne({
            where: {
                id
            }
        });

        return getUnitById;
    };

    static async handleGetAllUnit() {
        const getAllUnit = await units.findAll();

        return getAllUnit;
    };
}

module.exports = brandRepository;