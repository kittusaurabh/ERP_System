const jwt = require('jsonwebtoken');
const Users = require('../schema/user');
const { resp } = require('../utility/response');

exports.verifyToken = (req, res, next) => {

    const token = req.headers.accesstoken;
    if (!token) {
        return resp.unknown(res, "Token not provided")
    }

    //get panel name for api role
    let apiPanel = req.baseUrl.split('/')
    let role = apiPanel.pop()
    //end

    let query = {
        accessToken: token
    }
    if (role != 'common') {
        query.role = role
    }
    jwt.verify(token, 'supersecret', async function (err, decoded) {
        if (err)
            return resp.fail(res, 'Invalid token')
        let user = await Users.findOne(query).lean(true)
        if (!user)
            return resp.unauthorized(res)
        req.userData = user
        next();
    });
};
