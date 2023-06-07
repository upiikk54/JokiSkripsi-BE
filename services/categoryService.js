const categoryRepository = require("../repositories/categoryRepository")

class categoryService {
    static async handleCreateCategory({
        userId,
        categoryName
    }) {
        try {

            if (!categoryName) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Nama kategori wajib diisi.",
                    data: {
                        createdCategory: null,
                    },
                };
            }
            // ------------------------- End Payload Validation ------------------------- //

            const createdCategory = await categoryRepository.handleCreateCategory({
                userId,
                categoryName
            });

            return {
                status: true,
                statusCode: 201,
                message: "Berhasil membuat Kategori!",
                data: {
                    createdCategory: createdCategory,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    createdCategory: null,
                },
            };
        }
    }

    static async handleUpdateCategory({
        id,
        userId,
        categoryName
    }) {
        try {
            const getCategoryById = await categoryRepository.handleGetCategoryById({
                id
            });

            if (getCategoryById.userId == userId) {

                if (!categoryName) {
                    categoryName = getCategoryById.categoryName
                }

                const updatedCategory = await categoryRepository.handleUpdateCategory({
                    id,
                    categoryName,
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Kategori berhasil di perbarui!",
                    data: {
                        updatedCategory: updatedCategory,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai",
                    data: {
                        updatedCategory: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    updatedCategory: null,
                },
            };
        }
    };

    static async handleDeletecategory({
        id,
        userId,
    }) {
        try {
            const getCategoryById = await categoryRepository.handleGetCategoryById({
                id
            });

            if (getCategoryById.userId == userId) {
                const handleDeletecategory = await categoryRepository.handleDeletecategory({
                    id
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Kategori berhasil dihapus!",
                    data: {
                        deleteCategory: handleDeletecategory,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai.",
                    data: {
                        deleteCategory: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    deleteCategory: null,
                },
            };
        }
    };

    static async handleGetAllCategory() {
        try {
            const handleGetAllCategory = await categoryRepository.handleGetAllCategory();

            return {
                status: true,
                statusCode: 200,
                message: "Kategori berhasil ditampilkan",
                data: {
                    getAllCategory: handleGetAllCategory,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getAllCategory: null,
                },
            };
        }
    }

    static async handleGetCategoryById({
        id,
    }) {
        try {
            const getCategoryById = await categoryRepository.handleGetCategoryById({
                id,
            });
            return {
                status: true,
                statusCode: 200,
                message: "Kategori berhasil ditampilkan",
                data: {
                    getCategoryById: getCategoryById,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    getCategoryById: null,
                },
            };
        }
    };
}

module.exports = categoryService;