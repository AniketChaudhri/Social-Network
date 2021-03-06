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

exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check('name', 'Name is required').notEmpty();
    // email is not null, valid and normalized
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};
