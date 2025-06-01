import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import {
  LocalParking as ParkingIcon,
  DirectionsCar as CarIcon,
  MonetizationOn as RevenueIcon,
} from '@mui/icons-material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getDashboardData } from '../../services/parkingService';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Occupied', 'Available', 'Reserved'],
    datasets: [
      {
        data: data
          ? [data.occupiedSpots, data.availableSpots, data.reservedSpots]
          : [0, 0, 0],
        backgroundColor: ['#f72585', '#4cc9f0', '#4895ef'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Skeleton variant="rectangular" height={118} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Total Parking Spots
                  </Typography>
                  <Typography variant="h4">
                    {data?.totalSpots || 0}
                  </Typography>
                </div>
                <ParkingIcon color="primary" style={{ fontSize: 40 }} />
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary">
                  {data?.occupiedSpots || 0} occupied
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={
                    data
                      ? (data.occupiedSpots / data.totalSpots) * 100
                      : 0
                  }
                  color="primary"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Vehicles Parked
                  </Typography>
                  <Typography variant="h4">
                    {data?.vehiclesParked || 0}
                  </Typography>
                </div>
                <CarIcon color="secondary" style={{ fontSize: 40 }} />
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary">
                  {data?.reservedSpots || 0} reserved
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={
                    data
                      ? (data.reservedSpots / data.totalSpots) * 100
                      : 0
                  }
                  color="secondary"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Today's Revenue
                  </Typography>
                  <Typography variant="h4">
                    ${data?.todaysRevenue?.toFixed(2) || 0}
                  </Typography>
                </div>
                <RevenueIcon color="success" style={{ fontSize: 40 }} />
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary">
                  {data?.monthlyRevenue?.toFixed(2) || 0} this month
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={
                    data
                      ? (data.todaysRevenue / data.monthlyRevenue) * 100
                      : 0
                  }
                  color="success"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Parking Spot Distribution
              </Typography>
              <Box height={300}>
                <Doughnut data={chartData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <Box>
                {data?.recentActivities?.length > 0 ? (
                  <ul>
                    {data.recentActivities.map((activity, index) => (
                      <li key={index}>
                        <Typography>
                          {activity.vehicle} - {activity.status} at{' '}
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography>No recent activities</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;