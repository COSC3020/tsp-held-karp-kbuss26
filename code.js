/*
    Keifer Buss 
    COSC-3020-01 
    Last modified May 07 2024
    Sources: None for this program
*/

// For memoization
var cache = [];

// Tests held_karp function for every starting point in the distance matrix
function tsp_hk(distance_matrix) {
    var min_val = Infinity;
    for (var i = 0; i < distance_matrix.length; i++) {
        min_val = Math.min(min_val, held_karp(distance_matrix, i));
    }
    return min_val;
}

function held_karp(cities, start) {
    // Clear the cache for each call
    cache = [];
    // Base cases
    if (cities.length < 2) return 0;
    if (cities.length === 2) {
        cache[start] = cities[start][1 - start];
        return cities[start][1 - start];
    } else {
        var min_val = Infinity;
        var temp = [];
        var city_curr_dist = 0;

        // Takes the cities array and removes the row and column associated with the start node
        if (!(i === start)) {
            temp = [].concat(cities.slice(0, start), cities.slice((start + 1), cities.length))
            for (var j = 0; j < temp.length; j++) {
                temp[j] = [].concat(temp[j].slice(0, start), temp[j].slice((start + 1), cities.length))
            }
        }
        
        // Travelling down the cities
        for (var i = 0; i < temp.length; i++) {
            // Trinary operator here since we need to access the start city
            var j = (i < start) ? i : i + 1;
            city_curr_dist = cities[start][j]
            /* Dynamic programming implementation: if the distance to the city is less than
               the current minimum value, we don't need to travel down that path since even if the distance
               were zero from that recursive call, the existing distance would still be 
               greater than the minimum value. (This is assuming we cannot have negative distance) */
            if (city_curr_dist < min_val && cache[j] === undefined) {
                cache[i] = held_karp(temp, i)
                min_val = Math.min(min_val, cache[i] + city_curr_dist);
            }
        }

        cache[start] = min_val;
        return min_val
    }
}