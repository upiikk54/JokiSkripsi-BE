const unitService = require("../services/unitService")

const handleCreateUnit = async (req, res, next) => {
    
    const {
        unitName
    } = req.body

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await unitService.handleCreateUnit({
        userId,
        unitName
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
}

const handleUpdateUnit = async (req, res, next) => {
    const { unitName } = req.body;
    
    const {id} = req.params;

    const userId = req.user.id;

    const {status, statusCode, message, data} = await unitService.handleUpdateUnit({
        id,
        userId,
        unitName,
    });

    res.status(statusCode).send({
        status : status,
        message: message,
        data : data,
    });
};

const handleDeleteUnit = async (req, res) => {
    const {
        id
    } = req.params;

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await unitService.handleDeleteUnit({
        id,
        userId,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetUnitById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } = await unitService.handleGetUnitById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetAllUnit = async (req, res) => {
    const {
        status,
        statusCode,
        message,
        data
    } = await unitService.handleGetAllUnit();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = {
    handleCreateUnit,
    handleUpdateUnit,
    handleDeleteUnit,
    handleGetUnitById,
    handleGetAllUnit
}