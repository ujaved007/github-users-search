import React from "react";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
	const chartConfigs = {
		type: "column2d",
		width: "100%",
		height: "100%",
		dataFormat: "json",
		dataSource: {
			chart: {
				caption: "Most Popular",
				yAxisName: "Stars",
				xAxisName: "Repos",
				xAxisNameFontSize: "16px",
				yAxisNameFontSize: "16px",
				paletteColors: "#2DADBA, #5D62B4, #FFC432, #F1726F, #8D6E63",
				theme: "fusion",
			},
			data,
		},
	};
	return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
