const brandService = require("../services/brandService")

const handleCreateBrand = async (req, res, next) => {
    
    const {
        brandName
    } = req.body

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await brandService.handleCreateBrand({
        userId,
        brandName
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
}

const handleUpdateBrand = async (req, res, next) => {
    const { brandName } = req.body;
    
    const {id} = req.params;

    const userId = req.user.id;

    const {status, statusCode, message, data} = await brandService.handleUpdateBrand({
        id,
        userId,
        brandName,
    });

    res.status(statusCode).send({
        status : status,
        message: message,
        data : data,
    });
};

const handleDeleteBrand = async (req, res) => {
    const {
        id
    } = req.params;

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await brandService.handleDeleteBrand({
        id,
        userId,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetBrandById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } = await brandService.handleGetBrandById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetAllBrand = async (req, res) => {
    const {
        status,
        statusCode,
        message,
        data
    } = await brandService.handleGetAllBrand();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = {
    handleCreateBrand,
    handleUpdateBrand,
    handleDeleteBrand,
    handleGetBrandById,
    handleGetAllBrand
}