exports.checkId = async (paramsId) => {
    const id = Number(paramsId);
    if (isNaN(id)) {
        throw {
            status: 400,
            message: "Id noto'g'ri formatda!",
        };
    }

    return id;
};