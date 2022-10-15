import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import Campaigns from './shared/Campaigns';
import DoughnutChart from './shared/Doughnut';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingTable from './shared/TopSellingTable';
import UpgradeCard from './shared/UpgradeCard';

import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";


import {
   Chart,
   ArcElement,
   LineElement,
   BarElement,
   PointElement,
   BarController,
   BubbleController,
   DoughnutController,
   LineController,
   PieController,
   PolarAreaController,
   RadarController,
   ScatterController,
   CategoryScale,
   LinearScale,
   LogarithmicScale,
   RadialLinearScale,
   TimeScale,
   TimeSeriesScale,
   Decimation,
   Filler,
   Legend,
   Tooltip,
} from 'chart.js';

Chart.register(
   ArcElement,
   LineElement,
   BarElement,
   PointElement,
   BarController,
   BubbleController,
   DoughnutController,
   LineController,
   PieController,
   PolarAreaController,
   RadarController,
   ScatterController,
   CategoryScale,
   LinearScale,
   LogarithmicScale,
   RadialLinearScale,
   TimeScale,
   TimeSeriesScale,
   Decimation,
   Filler,
   Legend,
   Tooltip,
);

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

//doughnut chart
const data = {
  labels: ["Top Choice", "Glitters", "Shoe Palace", "Fashion Wings","Stylish", "Your Choice"],
  datasets: [
     {
        label:'Offer Count',
        data: [12, 40, 20, 25, 5, 18],
        backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'rgba(255, 206, 86, 0.2)',
           'rgba(75, 192, 192, 0.2)',
           'rgba(153, 102, 255, 0.2)',
           'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
           'rgba(255, 99, 132)',
           'rgba(54, 162, 235)',
           'rgba(255, 206, 86)',
           'rgba(75, 192, 192)',
           'rgba(153, 102, 255)',
           'rgba(255, 159, 64)'
        ],
        borderWidth: 1
     },
  ],
};


//bar chart
const data2 = {
  labels: ["Toys", "Cloths", "Shoes", "Sports","Outdoor", "Garden"],
  datasets: [
     {
        label:'Items in Store',
        data: [80, 85, 50, 25, 20, 75],
        backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'rgba(255, 206, 86, 0.2)',
           'rgba(75, 192, 192, 0.2)',
           'rgba(153, 102, 255, 0.2)',
           'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
           'rgba(255, 99, 132)',
           'rgba(54, 162, 235)',
           'rgba(255, 206, 86)',
           'rgba(75, 192, 192)',
           'rgba(153, 102, 255)',
           'rgba(255, 159, 64)'
        ],
        borderWidth: 1
     },
  ],
};

//line
const data3 = {
  labels: ["Top Choice", "Glitters", "Shoe Palace", "Stylish", "Your Choice", "Fashion Wings",],
  datasets: [
     {
        label:'Offer Count',
        data: [20, 6, 80, 30, 60, 15],
        backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'rgba(255, 206, 86, 0.2)',
           'rgba(75, 192, 192, 0.2)',
           'rgba(153, 102, 255, 0.2)',
           'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
           'rgba(255, 99, 132)',
           'rgba(54, 162, 235)',
           'rgba(255, 206, 86)',
           'rgba(75, 192, 192)',
           'rgba(153, 102, 255)',
           'rgba(255, 159, 64)'
        ],
        borderWidth: 1
     },
  ],
};

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const Analytics = () => {
  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards2 />



              {/* --------------------Bar chart----------------------- */}
              <div>
                <div style={{ width: "600px", margin: "0 auto" }}>
                    <Bar data={data2} />
                </div>
              </div>

              <br /><br /><br /><br /> <br />

              <div className='pr-24'>
               <div style={{ width: "400px", margin: "0 auto" }}>
                  <Doughnut data={data} />
               </div>
            </div>




          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
