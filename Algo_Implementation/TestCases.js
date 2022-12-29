// JS program to implement
// the above approach


function MinCostMaxFlow(cap, cost, s, t){

    let maxsize = Number.MAX_VALUE

    // Stores the found edges
    let found = []

    // Stores the number of nodes
    let N = 0

    // Stores the capacity
    // of each edge

    let flow = []

    // Stores the cost per
    // unit flow of each edge

    // Stores the distance from each node
    // and picked edges for each node
    let dad = []
    let dist = []
    let pi = []
    let assignment = [];

    let INF = Math.floor(maxsize / 2) - 1

    // Function to check if it is possible to
    // have a flow from the src to sink
    function search(src, sink)
    {

        // Initialise found[] to false
        let found = new Array(N).fill(false)

        // Initialise the dist[] to INF
        let dist = new Array(N + 1).fill(INF)

        // Distance from the source node
        dist[src] = 0

        // Iterate until src reaches N
        while (src != N)
        {
            let best = N
            found[src] = true
            
            for (var k = 0; k < N; k++)
            {

                // If already found
                if (found[k])
                    continue

                // Evaluate while flow
                // is still in supply
                if (flow[k][src] != 0)
                {
                    // Obtain the total value
                let val = (dist[src] + pi[src] -
                            pi[k] - cost[k][src])

                    // If dist[k] is > minimum value
                    if (dist[k] > val)
                    {
                        // Update
                        dist[k] = val
                        dad[k] = src
                    }
                }

                if (flow[src][k] < cap[src][k])
                {
                    let val = (dist[src] + pi[src] -
                            pi[k] + cost[src][k])

                    // If dist[k] is > minimum value
                    if (dist[k] > val)
                    {
                        // Update
                        dist[k] = val
                        dad[k] = src
                    }
                }

                if (dist[k] < dist[best])
                    best = k
            }

            // Update src to best for
            // next iteration
            src = best
        }

        for (var k = 0; k < N; k++)
            pi[k] = Math.min(pi[k] + dist[k], INF)

        // Return the value obtained at sink
        return found[sink]
    }

    // Function to obtain the maximum Flow
    function getMaxFlow(capi, costi,  src, sink)
    {

        cap = capi
        cost = costi

        N = (capi).length
        found =  new Array(N).fill(false); 
            
        flow = new Array(N);
        for (var i = 0; i < N; i++)
            flow[i] = new Array(N).fill(0)
        
        dist = new Array(N + 1).fill(INF)
        
        dad = new Array(N).fill(0)
        pi = new Array(N).fill(0)
        
        totflow = 0
        totcost = 0



        // If a path exist from src to sink
        while (search(src, sink))
        {
            let paths = [sink];
            // Set the default amount
            amt = INF
            x = sink
            
            while (x != src)
            {
                amt = Math.min(
                    amt,
                    (flow[x][dad[x]] != 0)?flow[x][dad[x]]:
                    cap[dad[x]][x] - flow[dad[x]][x])
                x = dad[x]
            }

            x = sink
            
            while (x != src)
            {
                // if dad[x] == 0, then add the existing array into a bigger array
                paths.push(dad[x]);

                if (flow[x][dad[x]] != 0)
                {
                    flow[x][dad[x]] -= amt
                    totcost -= amt * cost[x][dad[x]]
                }
                else
                {
                    flow[dad[x]][x] += amt
                    totcost += amt * cost[dad[x]][x]
                }
                x = dad[x]
            }

            totflow += amt

            assignment.push(paths);
        }
        // Return pair total cost and sink
        return [totflow, totcost]
    }


    getMaxFlow(cap, cost, s, t);

    // Possible assignments 
    console.log(assignment);
}




let cap = [];
let cost = [];
let s;
let t;

function testCase1(){
    console.log("TestCase #1")
    cap = [ [ 0, 4, 0, 0, 0, 3 ],
            [ 0, 0, 3, 0, 1, 0 ],
            [ 0, 0, 0, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 2, 0, 0 ], 
            [ 0, 0, 1, 0, 3, 0 ] ]
    
    
    cost = [[ 0, 2, 0, 0, 0, 2 ],
            [ 0, 0, 1, 0, 2, 0 ],
            [ 0, 0, 0, 2, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 1, 0, 0 ], 
            [ 0, 0, 0, 0, 2, 0 ] ]

    s = 0;
    t = 3;

    MinCostMaxFlow(cap, cost, s, t);
}

// Customer to plumber
function testCase2(){
    console.log("TestCase #2")
    cap = [ [ 0, 1, 1, 1, 1, 0, 0 , 0],
            [ 0, 0, 0, 0, 0, 1, 0 , 0],
            [ 0, 0, 0, 0, 0, 1, 0 , 0],
            [ 0, 0, 0, 0, 0, 1, 1 , 0],
            [ 0, 0, 0, 0, 0, 0, 1 , 0], 
            [ 0, 0, 0, 0, 0, 0, 0 , 3],
            [ 0, 0, 0, 0, 0, 0, 0 , 2], 
            [ 0, 0, 0, 0, 0, 0, 0 , 0] 
        ]
    cost = [ 
            [ 0, 0, 0, 0, 0, 0, 0 , 0],
            [ 0, 0, 0, 0, 0, 2, 0 , 0],
            [ 0, 0, 0, 0, 0, 3, 0 , 0],
            [ 0, 0, 0, 0, 0, 5, 3 , 0],
            [ 0, 0, 0, 0, 0, 0, 2 , 0], 
            [ 0, 0, 0, 0, 0, 0, 0 , 0],
            [ 0, 0, 0, 0, 0, 0, 0 , 0], 
            [ 0, 0, 0, 0, 0, 0, 0 , 0] 
        ]

    s = 0;
    t = 7;

    MinCostMaxFlow(cap, cost, s, t);
}

function testCase3(){
    console.log("TestCase #3")
    cap = [ 
        [ 0, 1, 1, 1, 0, 0, 0],
        [ 0, 0, 0, 0, 1, 0, 0],
        [ 0, 0, 0, 0, 1, 1, 0],
        [ 0, 0, 0, 0, 0, 1, 0],
        [ 0, 0, 0, 0, 0, 0, 3], 
        [ 0, 0, 0, 0, 0, 0, 2],
        [ 0, 0, 0, 0, 0, 0, 0]
    ]
    cost = [ 
        [ 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 1, 0, 0],
        [ 0, 0, 0, 0, 2, 4, 0],
        [ 0, 0, 0, 0, 0, 1, 0],
        [ 0, 0, 0, 0, 0, 0, 0], 
        [ 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0]
    ]

    s = 0;
    t = 6;

    MinCostMaxFlow(cap, cost, s, t);
}


testCase1();
testCase2();
testCase3();