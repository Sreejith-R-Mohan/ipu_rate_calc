const ipuData = {
    "Advanced Data Integration": {
        "Per Hour": 0.19
    },
    "Advanced Data Integration with Advanced Serverless": {
        "Per Hour": 0.32
    },
    "Advanced Data Quality": {
        "Per Hour": 0.45
    },
    "Advanced Data Quality with Advanced Serverless": {
        "Per Hour": 0.77
    },
    "API Center": {
        "Per Million API": 13.33
    },
    "API Management": {
        "Per Million API": 13.33
    },
    "Application Ingestion and Replication": {
        "Per Gigabyte": {
            "(0, 2000)": 0.1,
            "(2001, 10000)": 0.08,
            "(10001, 25000)": 0.05,
            "(25001, Infinity)": 0.018
        }
    },
    "Application Ingestion and Replication - Change Data Capture": {
        "Per Million Rows": {
            "(0, 10000000)": 6.00,
            "(10000001, Infinity)": 0.2
        }
    },
    "Application Integration": {
        "Per Hour": {
            "(0, 60)": 1.38,
            "(61, 1200)": 0.17,
            "(1201, 120000)": 0.043
        }
    },
    "Application Integration with Advanced Serverless": {
        "Per Hour": {
            "(0, 60)": 2.38,
            "(61, 1200)": 0.30,
            "(1201, 20000)": 0.074,
            "(20001, 50000)": 0.067,
            "(50001, 100000)": 0.053,
            "(100001, Infinity)": 0.021
        }
    },
    "Data Integration": {
        "Per Hour": {
            "(0, 2000)": 0.16,
            "(2001, Infinity)": 0.025
        }
    },
    "Data Integration with Advanced Serverless": {
        "Per Hour": {
            "(0, 2000)": 0.28,
            "(2001, Infinity)": 0.10
        }
    },
    "Data Quality": {
        "Per Hour": {
            "(0, 2000)": 0.38,
            "(2001, Infinity)": 0.152
        }
    },
    "Data Quality with Advanced Serverless": {
        "Per Hour": 0.65
    },
    "Batch Data Integration": {
        "Per Hour": 0.20
    },
    "Batch Data Integration with Advanced Serverless": {
        "Per Hour": 0.35
    },
    "Data Ingestion": {
        "Per Gigabyte": {
            "(0, 5000)": 0.12,
            "(5001, 20000)": 0.1,
            "(20001, Infinity)": 0.08
        }
    },
    "Data Ingestion with Advanced Serverless": {
        "Per Gigabyte": {
            "(0, 5000)": 0.15,
            "(5001, 20000)": 0.12,
            "(20001, Infinity)": 0.10
        }
    },
    "Real-Time Data Integration": {
        "Per Hour": 0.27
    },
    "Real-Time Data Integration with Advanced Serverless": {
        "Per Hour": 0.45
    },
    "Cloud Data Replication": {
        "Per Gigabyte": 0.05
    },
    "Cloud Data Replication with Advanced Serverless": {
        "Per Gigabyte": 0.08
    },
    "Cloud Data Sync": {
        "Per Hour": 0.12
    },
    "Cloud Data Sync with Advanced Serverless": {
        "Per Hour": 0.19
    },
    "Data Governance": {
        "Per Hour": 0.55
    },
    "Data Governance with Advanced Serverless": {
        "Per Hour": 0.87
    },
    "Streaming Data Integration": {
        "Per Hour": 0.34
    },
    "Streaming Data Integration with Advanced Serverless": {
        "Per Hour": 0.55
    },
    "Data Enrichment": {
        "Per Hour": 0.45
    },
    "Data Enrichment with Advanced Serverless": {
        "Per Hour": 0.69
    },
    "Data Warehousing Integration": {
        "Per Hour": 0.18
    },
    "Data Warehousing Integration with Advanced Serverless": {
        "Per Hour": 0.30
    },
    "Big Data Integration": {
        "Per Hour": 0.32
    },
    "Big Data Integration with Advanced Serverless": {
        "Per Hour": 0.55
    },
    "Cloud ETL Integration": {
        "Per Hour": 0.22
    },
    "Cloud ETL Integration with Advanced Serverless": {
        "Per Hour": 0.38
    },
    "File Ingestion and Replication": {
        "Per Gigabyte": {
            "(0, 5000)": 0.14,
            "(5001, Infinity)": 0.07
        }
    },
    "File Ingestion and Replication with Advanced Serverless": {
        "Per Gigabyte": {
            "(0, 5000)": 0.18,
            "(5001, Infinity)": 0.10
        }
    },
    "Hybrid Integration": {
        "Per Hour": 0.18
    },
    "Hybrid Integration with Advanced Serverless": {
        "Per Hour": 0.30
    }
};

let totalIPU = 0; // Initialize total IPU

// Function to populate the table
function populateTable() {
    const tableBody = document.getElementById("ipu-table").querySelector("tbody");
    tableBody.innerHTML = ""; // Clear the table

    let maxRanges = 0;

    // Find the maximum number of ranges across all services
    for (const service in ipuData) {
        for (const metricUnit in ipuData[service]) {
            const rateData = ipuData[service][metricUnit];
            if (typeof rateData === "object") {
                maxRanges = Math.max(maxRanges, Object.keys(rateData).length);
            }
        }
    }

    // Adjust the table header based on the maxRanges
    adjustTableHeader(maxRanges);

    // Create rows for each service
    for (const service in ipuData) {
        const serviceData = ipuData[service];

        for (const metricUnit in serviceData) {
            const rateData = serviceData[metricUnit];
            const row = document.createElement("tr");

            // Service Name
            row.appendChild(createCell(service));

            // Metric Unit
            row.appendChild(createCell(metricUnit));

            // Input Value (Number Input)
            const inputCell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.min = "0";
            input.dataset.service = service;
            input.dataset.metric = metricUnit;
            inputCell.appendChild(input);
            row.appendChild(inputCell);

            // Rate Ranges
            if (typeof rateData === "object") {
                let rangeCount = 0;
                for (const range in rateData) {
                    row.appendChild(createCell(`${range}: ${rateData[range]}`));
                    rangeCount++;
                }
                // Fill empty cells for missing ranges
                for (let i = rangeCount; i < maxRanges; i++) {
                    row.appendChild(createCell(""));
                }
            } else {
                // Single Rate
                const rateCell = document.createElement("td");
                rateCell.textContent = `All Values: ${rateData}`;
                rateCell.colSpan = maxRanges; // Span across all range columns
                row.appendChild(rateCell);
            }

            // IPU Consumption (Initial value is 0.00, to be calculated later)
            row.appendChild(createCell("0.00"));

            tableBody.appendChild(row);
        }
    }
}

// Helper function to create a table cell
function createCell(content) {
    const cell = document.createElement("td");
    cell.textContent = content;
    return cell;
}

// Adjust the table header to match the maximum ranges
function adjustTableHeader(maxRanges) {
    const headerRow = document.querySelector("#ipu-table thead tr");
    const rangeHeaders = headerRow.querySelectorAll("th");

    // Remove the existing range columns
    for (let i = 3; i <= 6; i++) {
        if (rangeHeaders[i]) {
            rangeHeaders[i].remove();
        }
    }

    // Add new headers based on the max number of ranges
    for (let i = 0; i < maxRanges; i++) {
        const th = document.createElement("th");
        th.textContent = `Range ${i + 1}`;
        headerRow.appendChild(th);
    }

    // Add IPU Consumption column
    const th = document.createElement("th");
    th.textContent = "IPU Consumption";
    headerRow.appendChild(th);
}


// Function to calculate IPU consumption
function calculateIPUConsumption(service, metricUnit, inputValue) {
    // Ensure inputValue is a valid number
    inputValue = parseFloat(inputValue);
    if (isNaN(inputValue) || inputValue <= 0) {
        return "Invalid input";
    }

    const rateData = ipuData[service] ? ipuData[service][metricUnit] : null;
    if (!rateData) {
        return "Rate data not found for this service and metric unit";
    }

    let ipuConsumption = 0;
    let remainingValue = inputValue;

    if (typeof rateData === "number") {
        // Flat rate: directly multiply inputValue by the rate
        ipuConsumption = remainingValue * rateData;
        return ipuConsumption.toFixed(2);
    }

    if (typeof rateData === "object") {
        // Handle multiple ranges
        const ranges = Object.keys(rateData);

        for (let i = 0; i < ranges.length; i++) {
            const range = ranges[i];
            const [min, max] = range
                .replace(/[()]/g, "")
                .split(",")
                .map(Number); // Convert range to numbers
            const rate = rateData[range];

            if (remainingValue <= 0) break; // Stop if no value remains to be processed

            if (remainingValue > max - min) {
                // Full range consumption
                ipuConsumption += (max - min) * rate;
                remainingValue -= max - min;
            } else {
                // Partial range consumption
                ipuConsumption += remainingValue * rate;
                remainingValue = 0; // All value consumed
            }
        }
        return ipuConsumption.toFixed(2);
    }

    return "Unexpected data format";
}


// Listen for input changes and update the IPU consumption
document.querySelector("#ipu-table").addEventListener("input", function (event) {
    if (event.target.tagName === "INPUT" && event.target.type === "number") {
        const input = event.target;
        const service = input.dataset.service;
        const metricUnit = input.dataset.metric;
        const inputValue = parseFloat(input.value) || 0;

        // Calculate the IPU consumption based on the input
        const ipuConsumption = calculateIPUConsumption(service, metricUnit, inputValue);

        // Find the corresponding IPU Consumption cell and update its value
        const row = input.closest("tr");
        const ipuCell = row.cells[row.cells.length - 1];
        ipuCell.textContent = ipuConsumption;

        // Recalculate the total IPU
        updateTotalIPU();
    }
});


// Update the total IPU consumption
function updateTotalIPU() {
    totalIPU = 0;

    // Loop through each row and sum up the IPU consumption
    const rows = document.querySelectorAll("#ipu-table tbody tr");
    rows.forEach(row => {
        const ipuCell = row.cells[row.cells.length - 1];
        const ipuValue = parseFloat(ipuCell.textContent) || 0;
        totalIPU += ipuValue;
    });

    // Display the total IPU
    document.getElementById("total-ipu").textContent = totalIPU.toFixed(2);
}

// Initialize the table
populateTable();
