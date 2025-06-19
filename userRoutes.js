const express = require('express')
const User = require('./models')
const mongoose = require('mongoose')

const router = express.Router()



router.get('/', async (req, res)=>{
    try {
        const users = await User.find()

        if (users.length === 0){
            return res.status(404).json({message: 'No users found!!'})
        }

        res.status(200).json({message: 'Users fetched sucessfully',users})
    } catch (error) {
        console.log("Error fetching the users!!")
        return res.status(500).json({message: "Error fetching the users!!"})
        
    }
})


router.get('/age18', async (req, res) => {
    try {
        const users = await User.find({ age: { $gt: 18 } })

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" })
        }

        res.status(200).json({ message: "Users found", users })
    } catch (error) {
        console.log("Error finding the users!!", error.message)
        return res.status(500).json({ message: "Error finding the users!!" })
    }
});


router.get('/nameAge', async (req, res) => {
    try {
        const users = await User.find({
            age: { $gt: 18 }, $or: [
                { firstName: { $regex: 'ah', $options: 'i' } },
                { lastName: { $regex: 'ah', $options: 'i' } }
            ]
        })

        if (users.length === 0) {
            return res.status(404).json({ message: "No users matched the criteria" });
        }
        console.log("Users found sucessfully")

        res.status(200).json({ message: "Users found sucessfully", users })


    } catch (error) {
        console.log("Error finding the users!!", error.message)
        return res.status(500).json({ message: "Error finding the users!!" })
    }
})

router.get('/update', async(req, res)=>{
    const oldUserLastName ="Kefi"
    const newUserLastName = "Anis"

    try{
        const updatedUser = await User.findOneAndUpdate(
            {lastName: oldUserLastName},
            {lastName: newUserLastName},
            {new: true}
        )

        if (!updatedUser){
            return res.status(401).json({message: 'User not found!!'})
        }

        console.log('User updated sucessfully', updatedUser)

        return res.status(200).json({message: 'User updated sucessfully', updatedUser})

    }catch(error){
        console.log("Error updating the user!!")

        return res.status(500).json({ message: "Error updating the user" })
    }
})


router.delete('/deleteUnder5', async (req, res) => {
    try {
        const result = await User.deleteMany({ age: { $lt: 5 } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No contacts under age 5 found to delete.' });
        }

        res.status(200).json({
            message: `${result.deletedCount} contact(s) deleted successfully.`,
        });

    } catch (error) {
        console.error("Error deleting contacts:", error.message);
        res.status(500).json({ message: 'Server error' });
    }
});





router.get('/:id', async (req, res) => {
    try {
       const user = await User.findById(req.params._id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("User found", user)
        return res.status(200).json({ message: "User sucessfully found", user })
    } catch (error) {
        console.log("Error finding the user!!", error.message)
    }
});





module.exports = router