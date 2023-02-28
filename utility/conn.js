import mongoose from 'mongoose';


mongoose.connect('mongodb://savyuser:SavY0011@43.204.209.67:27017/savypack_db', {
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection is set.")
}).catch((err) => {
    console.log("Connection Failed", err)
})
