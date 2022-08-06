exports.errorMapper = (error) => {
    if (error.name === 'ValidationError') {
        return Object
            .entries(error.errors)
            .map(([key, err]) => err.properties.message)
            .join('\n')
    }
    return error.message
}