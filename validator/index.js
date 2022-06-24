exports.createPostValidator = (req, res, next) => {
    req.check('title', 'Enter a Title').notEmpty();
    req.check('title', 'Title must be between 4 and 150 characters long').isLength({
        min: 4, 
        max: 150
    });

    req.check('body', 'Enter a body').notEmpty();
    req.check('body', 'body must be between 4 and 1500 characters long').isLength({
        min: 4,
        max: 1500
    });

    const errors = req.validationErrors();

    if (errors){
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError});
    }
    next();
}