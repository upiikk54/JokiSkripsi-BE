const categoryService = require("../services/categoryService")

const handleCreateCategory = async (req, res, next) => {
    
    const {
        categoryName
    } = req.body

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await categoryService.handleCreateCategory({
        userId,
        categoryName
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
}

const handleUpdateCategory = async (req, res, next) => {
    const { categoryName } = req.body;
    
    const {id} = req.params;

    const userId = req.user.id;

    const {status, statusCode, message, data} = await categoryService.handleUpdateCategory({
        id,
        userId,
        categoryName,
    });

    res.status(statusCode).send({
        status : status,
        message: message,
        data : data,
    });
};

const handleDeletecategory = async (req, res) => {
    const {
        id
    } = req.params;

    const userId = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await categoryService.handleDeletecategory({
        id,
        userId,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetCategoryById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } = await categoryService.handleGetCategoryById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetAllCategory = async (req, res) => {
    const {
        status,
        statusCode,
        message,
        data
    } = await categoryService.handleGetAllCategory();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = {
    handleCreateCategory,
    handleUpdateCategory,
    handleDeletecategory,
    handleGetCategoryById,
    handleGetAllCategory
}