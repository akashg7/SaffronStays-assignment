// https://api.apify.com/v2/datasets/Uj4uLhEU59ZPVAJot/items?clean=true&format=json
const express = require('express');
const app = express();
app.use(express.json());

//fetching the data from (airbnb + dummydata)
const fetchRoomData = async (roomId) => {
  try {
    //Airbnb API 
    const response = await fetch("https://api.apify.com/v2/datasets/Uj4uLhEU59ZPVAJot/items?clean=true&format=json");
    //since the api doesnt contain the below dummy data for  required calculations
    const data = await response.json()
    // console.log(data)
    const dummyData = {
      availability: {
        next5Months: [
          { month: 'January', daysAvailable: 20, totalDays: 31 },
          { month: 'February', daysAvailable: 15, totalDays: 28 },
          { month: 'March', daysAvailable: 25, totalDays: 31 },
          { month: 'April', daysAvailable: 18, totalDays: 30 },
          { month: 'May', daysAvailable: 22, totalDays: 31 },
        ],
      },
      pricing: {
        next30Days: [
          { date: '2024-12-22', rate: 120 },
          { date: '2024-12-23', rate: 140 },
          { date: '2024-12-24', rate: 100 }, 
        ],
      },
    };
    data.push(dummyData) 
    return dummyData; //only returning required data
  } catch (error) {
    throw new Error('Error fetching room data');
  }
};

//get the room details
app.get('/:room_id', async (req, res) => {
  const roomId = req.params.room_id;
   try {
    //getting the data
    const roomData = await fetchRoomData(roomId) 
    //occupancy percentage
    const occupancy = roomData.availability.next5Months.map((month) => ({
      month: month.month,
      occupancyPercentage: ((month.daysAvailable / month.totalDays) * 100).toFixed(2) + '%',
    }));

    //req calculations
    const rates = roomData.pricing.next30Days.map((day) => day.rate);
    const avgRate = (rates.reduce((sum, rate) => sum + rate, 0) / rates.length).toFixed(2);
    const highestRate = Math.max(...rates);
    const lowestRate = Math.min(...rates);

    //response
    res.json({
      roomId,
      occupancy,
      pricing: {
        averageRate: `$${avgRate}`,
        highestRate: `$${highestRate}`,
        lowestRate: `$${lowestRate}`,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));