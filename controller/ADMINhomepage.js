const event = require('../models/event');

//getting a form for creating a new event
exports.createEVENT = (req,res) =>{
    res.render('CREATEevents')
}


//recived the datas for creating events and save to the database
exports.createdEvent = async (req, res) => {
    try {
        const { title, description, startDateTime, endDateTime, location, category, price, capacity } = req.body;

        // convert to Date objects
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);

        // 1️⃣ Event start should not be in the past
        if (start < new Date()) {
            return res.send('Event start time cannot be in the past');
        }

        // 2️⃣ End must be after start
        if (end <= start) {
            return res.send('End time must be after start time');
        }

        // 3️⃣ Event must last at least 30 minutes
        if ((end - start) / 1000 / 60 < 30) {
            return res.send('Event must last at least 30 minutes');
        }

        // 4️⃣ No overlapping event at the same location
        const overlapping = await event.findOne({
            location,
            startDateTime: { $lt: end },
            endDateTime: { $gt: start }
        });

        if (overlapping) {
            return res.send('Another event exists at the same time and location');
        }

        // save the event
        await event.create({
            title,
            description,
            startDateTime: start,
            endDateTime: end,
            location,
            category,
            price,
            capacity
        });

        return res.send('Event created successfully');
        
    } catch (err) {
        console.log(err);
        return res.send('Something went wrong');
    }
};