function dijkstra(graph, start) {
   
    const distances = {};
    const visited = {}; 
    const previous = {}; 

    
    for (let vertex in graph) {
        distances[vertex] = Infinity;
        visited[vertex] = false;
        previous[vertex] = null; 
    }

   
    distances[start] = 0;

    
    while (true) {
       
        let minDistance = Infinity;
        let minVertex = null;

       
        for (let vertex in distances) {
            if (!visited[vertex] && distances[vertex] < minDistance) {
                minDistance = distances[vertex];
                minVertex = vertex;
            }
        }

        
        if (minVertex === null) break;

       
        visited[minVertex] = true;

        for (let neighbor in graph[minVertex]) {
          
            const distance = distances[minVertex] + graph[minVertex][neighbor];

           
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = minVertex;
            }
        }
    }

    return { distances, previous };
}

function reconstructPath(previous, start, target) {
    const path = [];
    let step = target;

    while (step !== start) {
        path.unshift(step); 
        step = previous[step]; 
    }

    path.unshift(start); 
    return path;
}


const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

const startVertex = 'A';
const { distances, previous } = dijkstra(graph, startVertex);

console.log("Distances les plus courtes à partir de", startVertex + ":");
console.log(distances);

const targetVertex = 'D';
const shortestPath = reconstructPath(previous, startVertex, targetVertex);

console.log("Chemin le plus court jusqu'à", targetVertex + ":");
console.log(shortestPath); 
