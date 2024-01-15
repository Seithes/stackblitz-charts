import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface SeriesData {
  time: number;
  value: number;
}

interface SeriesTypes {
  name: string;
  type: string;
  minimum: number;
  maximum: number;
  data: SeriesData[];
}

interface Props {
  chartName: string;
  chartDesc: string;
  yAxisLabel: string;
  xAxisLabel: string;
  chartData: SeriesTypes[];
}

const Chart: React.FC<Props> = ({ chartName, chartDesc, chartData }) => {
  // const startTime = chartData.length > 0 ? chartData[0].data[0].time : new Date();

  const options: Highcharts.Options = {
    title: {
      text: chartName,
      align: 'left',
    },
    subtitle: {
      text: chartDesc,
      align: 'left',
    },
    yAxis: {
      title: {
        text: 'Value',
      },
    },
    xAxis: {
      type: 'datetime',
      accessibility: {
        rangeDescription: 'Time',
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 0,
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
    series: [
      {
        name: chartData[0].name,
        type: chartData[0].type,
        data: chartData[0].data.map((point) => [point.time, point.value]),
      },
      {
        name: chartData[1].name,
        type: chartData[1].type,
        data: chartData[1].data.map((point) => [point.time, point.value]),
      },
      {
        name: chartData[2].name,
        type: chartData[2].type,
        data: chartData[2].data.map((point) => [point.time, point.value]),
      },
    ],
  };
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
      <div>
        <b>{chartData[0].name} - Min:</b> &ensp;
        {chartData[0].minimum} &emsp;
        <b>Max:</b> &ensp;
        {chartData[0].maximum}
      </div>
      <div>
        <b>{chartData[1].name} - Min:</b> &ensp;
        {chartData[1].minimum} &emsp;
        <b>Max:</b> &ensp;
        {chartData[1].maximum} &emsp;
      </div>
      <div>
        <b>{chartData[2].name} - Min:</b> &ensp;
        {chartData[2].minimum} &emsp;
        <b>Max:</b> &ensp;
        {chartData[2].maximum} &emsp;
      </div>
    </div>
  );
};

export default Chart;
