const unitRepository = require("../repositories/unitRepository")

class unitService {
    static async handleCreateUnit({
        userId,
        unitName
    }) {
        try {

            if (!unitName) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "satuan wajib diisi.",
                    data: {
                        createUnit: null,
                    },
                };
            }
            // ------------------------- End Payload Validation ------------------------- //

            const createUnit = await unitRepository.handleCreateUnit({
                userId,
                unitName
            });

            return {
                status: true,
                statusCode: 201,
                message: "Berhasil membuat satuan!",
                data: {
                    createUnit: createUnit,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    createUnit: null,
                },
            };
        }
    }

    static async handleUpdateUnit({
        id,
        userId,
        unitName
    }) {
        try {
            const getUnitById = await unitRepository.handleGetUnitById({
                id
            });

            if (getUnitById.userId == userId) {

                if (!unitName) {
                    unitName = getUnitById.unitName
                }

                const handleUpdateUnit = await unitRepository.handleUpdateUnit({
                    id,
                    unitName,
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Satuan berhasil di perbarui!",
                    data: {
                        updatedUnit: handleUpdateUnit,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai",
                    data: {
                        updatedUnit: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    updatedUnit: null,
                },
            };
        }
    };

    static async handleDeleteUnit({
        id,
        userId,
    }) {
        try {
            const getUnitById = await unitRepository.handleGetUnitById({
                id
            });

            if (getUnitById.userId == userId) {
                const handleDeleteUnit = await unitRepository.handleDeleteUnit({
                    id
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Satuan berhasil dihapus!",
                    data: {
                        deleteUnit: handleDeleteUnit,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai.",
                    data: {
                        deleteUnit: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    deleteUnit: null,
                },
            };
        }
    };

    static async handleGetAllUnit() {
        try {
            const handleGetAllUnit = await unitRepository.handleGetAllUnit();

            return {
                status: true,
                statusCode: 200,
                message: "Satuan berhasil ditampilkan",
                data: {
                    getAllUnit: handleGetAllUnit,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getAllUnit: null,
                },
            };
        }
    }

    static async handleGetUnitById({
        id,
    }) {
        try {
            const getUnitbyId = await unitRepository.handleGetUnitById({
                id,
            });
            return {
                status: true,
                statusCode: 200,
                message: "Satuan berhasil ditampilkan",
                data: {
                    getUnitbyId: getUnitbyId,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    getUnitbyId: null,
                },
            };
        }
    };
}

module.exports = unitService;