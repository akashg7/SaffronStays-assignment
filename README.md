To test the API in browser :

url : https://saffronstays-assignment.onrender.com/ROOM_ID
add ROOM_ID to get the details
ex ROOM_ID : 12

Challenges Faced :

1 Fetching Live Data
Challenge: Airbnb APIs are not openly available for public use.
Solution: Used APIFY and mock data to simulate the response.

2 Calculating Statistics:
Challenge: Handling incomplete data (e.g., missing availability or pricing).
Solution: Added checks and mock values to ensure robust calculations.

3 Scalability and Optimization:
Challenge: Large datasets could slow down calculations.
Solution: Utilize efficient array methods like reduce, Math.max, etc., to minimize overhead.
