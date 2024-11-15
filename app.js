// Define IPU per metric unit data for all 40 services
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
            "(2000, 10000)": 0.08,
            "(10000, 25000)": 0.05,
            "(25000, inf)": 0.018
        }
    },
    "Application Ingestion and Replication - Change Data Capture": {
        "Per Million Rows": {
            "(0, 10000000)": 6.00,
            "(10000000, inf)": 0.2
        }
    },
    "Application Integration": {
        "Per Hour": {
            "(0, 60)": 1.38,
            "(60, 1200)": 0.17,
            "(1200, 120000)": 0.043
        }
    },
    "Application Integration with Advanced Serverless": {
        "Per Hour": {
            "(0, 60)": 2.38,
            "(60, 1200)": 0.30,
            "(1200, 20000)": 0.074,
            "(20000, 50000)": 0.067,
            "(50000, 100000)": 0.053,
            "(100000, inf)": 0.021
        }
    },
    "Data Integration": {
        "Per Hour": {
            "(0, 2000)": 0.16,
            "(2000, inf)": 0.025
        }
    },
    "Data Integration with Advanced Serverless": {
        "Per Hour": {
            "(0, 2000)": 0.28,
            "(2000, inf)": 0.10
        }
    },
    "Data Quality": {
        "Per Hour": {
            "(0, 2000)": 0.38,
            "(2000, inf)": 0.152
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
            "(5000, 20000)": 0.1,
            "(20000, inf)": 0.08
        }
    },
    "Data Ingestion with Advanced Serverless": {
        "Per Gigabyte": {
            "(0, 5000)": 0.15,
            "(5000, 20000)": 0.12,
            "(20000, inf)": 0.10
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
            "(5000, inf)": 0.07
        }
    },
    "File Ingestion and Replication with Advanced Serverless": {
        "Per Gigabyte": {
            "(0, 5000)": 0.18,
            "(5000, inf)": 0.10
        }
    },
    "Hybrid Integration": {
        "Per Hour": 0.18
    },
    "Hybrid Integration with Advanced Serverless": {
        "Per Hour": 0.30
    }
};

// Handle form submission and IPU calculation
document.getElementById("ipu-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const serviceType = document.getElementById("service_type").value;
    const scalerValue = parseFloat(document.getElementById("scaler_value").value);
    const metricUnit = document.getElementById("metric_unit").value;

    // Validate inputs
    if (!serviceType || !scalerValue || !metricUnit) {
        document.getElementById("result").innerText = "Please fill in all fields.";
        return;
    }

    // Calculate IPU Consumption
    const result = calculateIPUConsumption(serviceType, scalerValue, metricUnit);

    // Display result
    document.getElementById("result").innerText = result;
});

// Function to calculate IPU consumption based on selected service
function calculateIPUConsumption(serviceType, scalerValue, metricUnit) {
    // Check if the service exists in the data
    if (!ipuData[serviceType]) {
        return "Invalid service type.";
    }

    const serviceData = ipuData[serviceType];
    
    // Check if the metric unit exists for this service
    if (!serviceData[metricUnit]) {
        return "Invalid metric unit for this service.";
    }

    // Handle range-based pricing for certain services (e.g., Per Gigabyte)
    if (typeof serviceData[metricUnit] === "object") {
        const ranges = serviceData[metricUnit];
        for (const range in ranges) {
            const [lower, upper] = range.replace(/[()]/g, "").split(",").map(Number);
            if (scalerValue >= lower && scalerValue < upper) {
                return `IPU Consumption: ${scalerValue * ranges[range]}`;
            }
        }
        return "Scaler value out of expected range.";
    }

    // For fixed pricing
    return `IPU Consumption: ${scalerValue * serviceData[metricUnit]}`;
}
