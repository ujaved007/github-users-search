import React from "react";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
	const chartConfigs = {
		type: "doughnut2d",
		width: "100%",
		height: 400,
		dataFormat: "json",
		dataSource: {
			chart: {
				caption: "Languages",
				centerLabel: "$label",
				doughnutRadius: 70,
				pieRadius: 70,
				theme: "fusion",
			},
			data,
		},
	};
	return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
