import { FC } from 'react';
import React from 'react';
import BitMEXFeed from './components/BitMEXFeed';
import Button from './components/DisplayButton';
import Chart from './components/Chart';
import './style.css';

//2 Hours Friday, 5 Hours Sunday, Total 7 hours.
const chart1Name = 'Bitcoin (BTC)';
const chart1Desc = 'Bitcoin (BTC) to United Stated Dollar (USD)';
const chart1Currency = 'XBTUSD';
const initialChartData = [
  {
    name: 'Buy Price',
    type: 'line',
    minimum: 0,
    maximum: 0,
    data: [],
  },
  {
    name: 'Sell Price',
    type: 'line',
    minimum: 0,
    maximum: 0,
    data: [],
  },
  {
    name: 'Trade Size',
    type: 'column',
    minimum: 0,
    maximum: 0,
    data: [],
  },
];

const chart2Name = 'Ethereum (ETH)';
const chart3Name = 'Tether(USDT)';

export const App: FC<{ name: string }> = ({ name }) => {
  const [chart1Data, setChartData] = React.useState<any[]>(initialChartData);
  const [isChart1Visible, setChart1Visible] = React.useState(false);
  const [isChart2Visible, setChart2Visible] = React.useState(false);
  const [isChart3Visible, setChart3Visible] = React.useState(false);

  const handleDataReceived = (data: any) => {
    const currentData = chart1Data;
    data.forEach((item: any) => {
      const timestamp = Date.parse(item.timestamp);
      if (item.side == 'Buy') {
        //Min/Max setting
        if (
          item.price > currentData[0].maximum ||
          currentData[0].data.length == 0
        ) {
          currentData[0].maximum = item.price;
        }
        if (
          item.price < currentData[0].minimum ||
          currentData[0].data.length == 0
        ) {
          currentData[0].minimum = item.price;
        }
        //Add new data
        currentData[0].data.push({ time: timestamp, value: item.price });
      }

      if (item.side == 'Sell') {
        //Min/Max setting
        if (
          item.price > currentData[1].maximum ||
          currentData[1].data.length == 0
        ) {
          currentData[1].maximum = item.price;
        }
        if (
          item.price < currentData[1].minimum ||
          currentData[1].data.length == 0
        ) {
          currentData[1].minimum = item.price;
        }
        //Add new data..
        currentData[1].data.push({ time: timestamp, value: item.price });
      }
      //Trade Size
      if (
        item.size > currentData[2].maximum ||
        currentData[2].data.length == 0
      ) {
        currentData[2].maximum = item.size;
      }
      if (
        item.size < currentData[2].minimum ||
        currentData[2].data.length == 0
      ) {
        currentData[2].minimum = item.size;
      }
      currentData[2].data.push({ time: timestamp, value: item.size });
      //Update chart and re-render
      setChartData((prevData) => [...prevData, currentData]);
    });
  };
  return (
    <div className="main">
      <h1>{name}!</h1>
      <div className="frame">
        <h2>{chart1Name} Chart</h2>
        {isChart1Visible && (
          <div className="chart">
            <BitMEXFeed
              currency={chart1Currency}
              onDataReceived={handleDataReceived}
            />
            <Chart
              chartName={chart1Name}
              chartDesc={chart1Desc}
              yAxisLabel="Y Axis"
              xAxisLabel="X Axis"
              chartData={chart1Data}
            />
          </div>
        )}
        <Button
          border="none"
          color="rgb(101,163,232)"
          height="25px"
          width="fit-content"
          onClick={() => setChart1Visible(!isChart1Visible)}
          buttonName={chart1Name}
        />
      </div>
      <div className="frame">
        <h2>{chart2Name} Chart</h2>
        {isChart2Visible && (
          <div className="chart-placeholder">{chart2Name} Placeholder..</div>
        )}
        <Button
          border="none"
          color="rgb(101,163,232)"
          height="25px"
          width="fit-content"
          onClick={() => setChart2Visible(!isChart2Visible)}
          buttonName={chart2Name}
        />
      </div>
      <div className="frame">
        <h2>{chart3Name} Chart</h2>
        {isChart3Visible && (
          <div className="chart-placeholder">{chart3Name} Placeholder..</div>
        )}
        <Button
          border="none"
          color="rgb(101,163,232)"
          height="25px"
          width="fit-content"
          onClick={() => setChart3Visible(!isChart3Visible)}
          buttonName={chart3Name}
        />
      </div>
    </div>
  );
};
