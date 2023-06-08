const supplierService = require("../services/supplierService");

const handleCreateSupplier = async (req, res, next) => {
    
    const {
        supplierName,
        contact,
        address,
        description        
    } = req.body

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await supplierService.handleCreateSupplier({
        userId,
        supplierName,
        contact,
        address,
        description 
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
}

const handleUpdateSupplier = async (req, res, next) => {
    const { 
        supplierName,
        contact,
        address,
        description  } = req.body;
    
    const {id} = req.params;

    const userId = req.user.id;

    const {status, statusCode, message, data} = await supplierService.handleUpdateSupplier({
        id,
        userId,
        supplierName,
        contact,
        address,
        description 
    });

    res.status(statusCode).send({
        status : status,
        message: message,
        data : data,
    });
};

const handleDeleteSupplier = async (req, res) => {
    const {
        id
    } = req.params;

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await supplierService.handleDeleteSupplier({
        id,
        userId,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetSupplierById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } = await supplierService.handleGetSupplierById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetAllSupplier = async (req, res) => {
    const {
        status,
        statusCode,
        message,
        data
    } = await supplierService.handleGetAllSupplier();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
module.exports = {
    handleCreateSupplier,
    handleUpdateSupplier,
    handleDeleteSupplier,
    handleGetSupplierById,
    handleGetAllSupplier
}