const {
    brands
} = require("../models")

class brandRepository {
    static async handleCreateBrand({
        userId,
        brandName
    }) {

        const createdBrand = brands.create({
            userId,
            brandName
        });

        return createdBrand;
    };

    static async handleUpdateBrand({
        id,
        brandName,
    }) {

        const updateBrand = await brands.update({
            brandName
        }, {
            where: {
                id
            }
        });

        return updateBrand;
    };

    static async handleDeleteBrand({ id }) {

        const deleteBrand = await brands.destroy({ where: { id } });

        return deleteBrand;
    
    };

    static async handleGetBrandById({
        id
    }) {
        const getBrandById = await brands.findOne({
            where: {
                id
            }
        });

        return getBrandById;
    };

    static async handleGetAllBrand() {
        const handleGetAllBrand = await brands.findAll();

        return handleGetAllBrand;
    };
}

module.exports = brandRepository;