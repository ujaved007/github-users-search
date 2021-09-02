import React from "react";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
	const chartConfigs = {
		type: "pie2d",
		width: 400,
		height: 400,
		dataFormat: "json",
		dataSource: {
			chart: {
				caption: "Stars per language",
				doughnutRadius: 70,
				pieRadius: 70,
				showPercentValues: 0,
				theme: "fusion",
			},
			data,
		},
	};
	return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
