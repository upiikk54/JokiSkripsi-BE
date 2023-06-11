const {
    suppliers,
    users
} = require("../models")

class supplierRepository {
    static async handleCreateSupplier({
        userId,
        supplierName,
        contact,
        address,
        description
    }) {

        const createdSupplier = suppliers.create({
            userId,
            supplierName,
            contact,
            address,
            description
        });

        return createdSupplier;
    };

    static async handleUpdateSupplier({
        id,
        supplierName,
        contact,
        address,
        description
    }) {

        const updatedSupplier = await suppliers.update({
            supplierName,
            contact,
            address,
            description
        }, {
            where: {
                id
            }
        });

        return updatedSupplier;
    };

    static async handleDeleteSupplier({ id }) {

        const deleteSupplier = await suppliers.destroy({ where: { id } });

        return deleteSupplier;
    
    };

    static async handleGetSupplierById({
        id
    }) {
        const getSupplierById = await suppliers.findOne({
            where: {
                id
            },
            include: {
                model: users,
                attributes: ['email','role']
            }
        });

        return getSupplierById;
    };

    static async handleGetAllSupplier() {
        const getAllSupplier = await suppliers.findAll({
            include: {
                model: users,
                attributes: ['email','role']
            }
        });

        return getAllSupplier;
    };
}

module.exports = supplierRepository