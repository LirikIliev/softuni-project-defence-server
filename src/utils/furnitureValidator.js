exports.furnitureValidator = (data) => {
    let imageUrlRegexp = /^https:\/\/|http:\/\//g;
    let match = data.imageUrl.match(imageUrlRegexp)
    if (data.author && data.country && data.destination && data.description && data.imageUrl) {
        if (match) {
            return data;
        };
        throw { message: "Please use url/ link to add image on your sofa!" };
    };
    throw { message: "Please fill all the fields correctly!" };
};