const brandRepository = require("../repositories/brandRepository")

class brandService {
    static async handleCreateBrand({
        userId,
        brandName
    }) {
        try {

            if (!brandName) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "merk wajib diisi.",
                    data: {
                        createdBrand: null,
                    },
                };
            }
            // ------------------------- End Payload Validation ------------------------- //

            const createdBrand = await brandRepository.handleCreateBrand({
                userId,
                brandName
            });

            return {
                status: true,
                statusCode: 201,
                message: "Berhasil membuat merk!",
                data: {
                    createdBrand: createdBrand,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    createdBrand: null,
                },
            };
        }
    }

    static async handleUpdateBrand({
        id,
        userId,
        brandName
    }) {
        try {
            const getBrandById = await brandRepository.handleGetBrandById({
                id
            });

            if (getBrandById.userId == userId) {

                if (!brandName) {
                    brandName = getBrandById.brandName
                }

                const handleUpdateBrand = await brandRepository.handleUpdateBrand({
                    id,
                    brandName,
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "merk berhasil di perbarui!",
                    data: {
                        updatedBrand: handleUpdateBrand,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai",
                    data: {
                        updatedBrand: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    updatedBrand: null,
                },
            };
        }
    };

    static async handleDeleteBrand({
        id,
        userId,
    }) {
        try {
            const getBrandById = await brandRepository.handleGetBrandById({
                id
            });

            if (getBrandById.userId == userId) {
                const handleDeleteBrand = await brandRepository.handleDeleteBrand({
                    id
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Brand berhasil dihapus!",
                    data: {
                        deleteBrand: handleDeleteBrand,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai.",
                    data: {
                        deleteBrand: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    deleteBrand: null,
                },
            };
        }
    };

    static async handleGetAllBrand() {
        try {
            const handleGetAllBrand = await brandRepository.handleGetAllBrand();

            return {
                status: true,
                statusCode: 200,
                message: "merk berhasil ditampilkan",
                data: {
                    getAllBrand: handleGetAllBrand,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getAllBrand: null,
                },
            };
        }
    }

    static async handleGetBrandById({
        id,
    }) {
        try {
            const getBrandById = await brandRepository.handleGetBrandById({
                id,
            });
            return {
                status: true,
                statusCode: 200,
                message: "brand berhasil ditampilkan",
                data: {
                    getBrandById: getBrandById,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    getBrandById: null,
                },
            };
        }
    };
}

module.exports = brandService;