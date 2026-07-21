(function () {
    "use strict";

    const SMARTCROP_GREEN = "#198754";
    const SMARTCROP_GREEN_LIGHT = "rgba(25, 135, 84, 0.15)";
    const CHART_FONT = "'Segoe UI', system-ui, -apple-system, sans-serif";

    function readJsonScript(id, fallback) {
        const element = document.getElementById(id);
        if (!element) {
            return fallback;
        }
        try {
            return JSON.parse(element.textContent);
        } catch (error) {
            console.warn(`Failed to parse JSON from #${id}`, error);
            return fallback;
        }
    }

    function correlationColor(value) {
        if (value >= 0.5) {
            return "rgba(25, 135, 84, 0.85)";
        }
        if (value >= 0.2) {
            return "rgba(25, 135, 84, 0.55)";
        }
        if (value >= 0) {
            return "rgba(25, 135, 84, 0.25)";
        }
        if (value >= -0.2) {
            return "rgba(220, 53, 69, 0.25)";
        }
        if (value >= -0.5) {
            return "rgba(220, 53, 69, 0.55)";
        }
        return "rgba(220, 53, 69, 0.85)";
    }

    function initCropDistributionChart() {
        const canvas = document.getElementById("cropDistributionChart");
        if (!canvas) {
            return;
        }

        const data = readJsonScript("crop-distribution-data", { labels: [], counts: [] });

        new Chart(canvas, {
            type: "bar",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Samples",
                    data: data.counts,
                    backgroundColor: SMARTCROP_GREEN_LIGHT,
                    borderColor: SMARTCROP_GREEN,
                    borderWidth: 1,
                    borderRadius: 4,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => ` ${context.parsed.y} samples`,
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 60,
                            minRotation: 45,
                            autoSkip: true,
                            maxTicksLimit: 12,
                            font: { size: 11 },
                        },
                        grid: { display: false },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Sample Count",
                        },
                        ticks: { stepSize: 20 },
                    },
                },
            },
        });
    }

    function initModelComparisonChart() {
        const canvas = document.getElementById("modelComparisonChart");
        if (!canvas) {
            return;
        }

        const models = readJsonScript("model-comparison-data", []);
        const labels = models.map((item) => item.model);
        const values = models.map((item) => item.accuracy);

        new Chart(canvas, {
            type: "bar",
            data: {
                labels,
                datasets: [{
                    label: "Accuracy (%)",
                    data: values,
                    backgroundColor: values.map((value) =>
                        value === Math.max(...values) ? SMARTCROP_GREEN : SMARTCROP_GREEN_LIGHT
                    ),
                    borderColor: SMARTCROP_GREEN,
                    borderWidth: 1,
                    borderRadius: 6,
                }],
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => ` ${context.parsed.x}% accuracy`,
                        },
                    },
                },
                scales: {
                    x: {
                        min: 90,
                        max: 100,
                        title: {
                            display: true,
                            text: "Accuracy (%)",
                        },
                    },
                    y: {
                        grid: { display: false },
                    },
                },
            },
        });
    }

    function initCorrelationHeatmapChart() {
        const canvas = document.getElementById("correlationHeatmapChart");
        if (!canvas) {
            return;
        }

        const featureNames = readJsonScript("feature-names-data", []);
        const matrix = readJsonScript("correlation-matrix-data", []);
        const shortLabels = featureNames.map((name) => {
            const abbreviations = {
                Nitrogen: "N",
                Phosphorus: "P",
                Potassium: "K",
                Temperature: "Temp",
                Humidity: "Humid",
                Rainfall: "Rain",
            };
            return abbreviations[name] || name;
        });

        const points = [];
        matrix.forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                points.push({
                    x: shortLabels[colIndex],
                    y: shortLabels[rowIndex],
                    v: value,
                });
            });
        });

        new Chart(canvas, {
            type: "matrix",
            data: {
                datasets: [{
                    label: "Correlation",
                    data: points,
                    backgroundColor: (context) => correlationColor(context.raw.v),
                    borderColor: "#ffffff",
                    borderWidth: 1,
                    width: ({ chart }) => (chart.chartArea || {}).width / shortLabels.length - 2,
                    height: ({ chart }) => (chart.chartArea || {}).height / shortLabels.length - 2,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: () => "",
                            label: (context) => {
                                const point = context.raw;
                                return `${point.y} vs ${point.x}: ${point.v.toFixed(2)}`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        type: "category",
                        labels: shortLabels,
                        offset: true,
                        grid: { display: false },
                        ticks: { font: { size: 11 } },
                    },
                    y: {
                        type: "category",
                        labels: shortLabels,
                        offset: true,
                        reverse: true,
                        grid: { display: false },
                        ticks: { font: { size: 11 } },
                    },
                },
            },
        });
    }

    Chart.defaults.font.family = CHART_FONT;
    Chart.defaults.color = "#6c757d";

    document.addEventListener("DOMContentLoaded", () => {
        initCropDistributionChart();
        initModelComparisonChart();
        initCorrelationHeatmapChart();
    });
})();
