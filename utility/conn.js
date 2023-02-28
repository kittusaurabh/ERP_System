const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/ERPSystem', {
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection is set.")
}).catch((err) => {
    console.log("Connection Failed", err)
})