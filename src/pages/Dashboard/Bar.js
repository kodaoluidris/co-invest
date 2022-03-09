import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    props: {
        chartData: {}
    },
    data() {
        return {
            options: {
                scales: {
                    xAxes: [{
                        stacked: false,
                        // gridLines: { display: true }
                    }],
                    yAxes: [{
                        stacked: false
                    }]
                },
                legend: { display: true },
                responsive: true,
                maintainAspectRatio: false
            },
        }
    },
    mounted() {
        this.renderChart({
            labels: ['Land', 'Mall', 'Yatch', 'Office space'],
            datasets: [{
                    label: 'Investors',
                    backgroundColor: 'rgba(115, 103, 240, 1)',
                    borderColor: 'rgba(115, 103, 240, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(115, 103, 240, 0.2)',
                    hoverBorderColor: 'rgba(115, 103, 240)',
                    borderCapStyle: 'round',
                    // barPercentage: 0.5,
                    // barThickness: 9,
                    data: [30, 50, 67, 150]
                },
                // {
                //     label: 'Difficult Items',
                //     backgroundColor: 'rgba(0, 227, 150, 1)',
                //     borderColor: 'rgba(0, 227, 150, 1)',
                //     borderWidth: 1,
                //     hoverBackgroundColor: 'rgba(0, 227, 150, 0.2)',
                //     hoverBorderColor: 'rgba(0, 227, 150)',
                //     borderCapStyle: 'round',
                //     // barPercentage: 0.5,
                //     // barThickness: 9,
                //     data: this.chartData.difficult_items
                // },
                // {
                //     label: 'Poor Items',
                //     backgroundColor: 'rgba(254, 176, 25, 1)',
                //     borderColor: 'rgba(254, 176, 25, 1)',
                //     borderWidth: 1,
                //     hoverBackgroundColor: 'rgba(254, 176, 25, 0.2)',
                //     hoverBorderColor: 'rgba(254, 176, 25)',
                //     borderCapStyle: 'round',
                //     // barPercentage: 0.5,
                //     // barThickness: 9,
                //     data: this.chartData.poor_items
                // }
            ]
        }, this.options)
    },
    watch: {
        // chartData() {
        //     this.renderChart({
        //         labels: this.chartData.subjects,
        //         datasets: [{
        //                 label: 'Good Items',
        //                 backgroundColor: 'rgba(0, 143, 251, 1)',
        //                 borderColor: 'rgba(0, 143, 251, 1)',
        //                 borderWidth: 1,
        //                 hoverBackgroundColor: 'rgba(0, 143, 251, 0.2)',
        //                 hoverBorderColor: 'rgba(0, 143, 251)',
        //                 borderCapStyle: 'round',
        //                 // barPercentage: 0.5,
        //                 // barThickness: 9,
        //                 data: this.chartData.good_items
        //             },
        //             {
        //                 label: 'Difficult Items',
        //                 backgroundColor: 'rgba(0, 227, 150, 1)',
        //                 borderColor: 'rgba(0, 227, 150, 1)',
        //                 borderWidth: 1,
        //                 hoverBackgroundColor: 'rgba(0, 227, 150, 0.2)',
        //                 hoverBorderColor: 'rgba(0, 227, 150)',
        //                 borderCapStyle: 'round',
        //                 // barPercentage: 0.5,
        //                 // barThickness: 9,
        //                 data: this.chartData.difficult_items
        //             },
        //             {
        //                 label: 'Poor Items',
        //                 backgroundColor: 'rgba(254, 176, 25, 1)',
        //                 borderColor: 'rgba(254, 176, 25, 1)',
        //                 borderWidth: 1,
        //                 hoverBackgroundColor: 'rgba(254, 176, 25, 0.2)',
        //                 hoverBorderColor: 'rgba(254, 176, 25)',
        //                 borderCapStyle: 'round',
        //                 // barPercentage: 0.5,
        //                 // barThickness: 9,
        //                 data: this.chartData.poor_items
        //             }
        //         ]
        //     }, this.options)
        // }
    },
}
