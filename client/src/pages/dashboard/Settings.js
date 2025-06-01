import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Payment as PaymentIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';
import { getCurrentUser, updateProfile, changePassword } from '../../services/userService';

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [paymentSettings, setPaymentSettings] = useState({
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      setUser(response.data);
      setProfileData({
        name: response.data.name,
        email: response.data.email,
        avatar: response.data.avatar,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentSettings({
      ...paymentSettings,
      [name]: value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      fetchUser();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword(passwordData);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleAvatarUpload = (e) => {
    // In a real app, you would upload the file to a server
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData({
          ...profileData,
          avatar: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Box>Loading...</Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Profile" icon={<PersonIcon />} />
        <Tab label="Password" icon={<LockIcon />} />
        <Tab label="Notifications" icon={<NotificationsIcon />} />
        <Tab label="Payment" icon={<PaymentIcon />} />
      </Tabs>

      {tabValue === 0 && (
        <Card>
          <CardContent>
            <Box
              component="form"
              onSubmit={handleProfileSubmit}
              sx={{ maxWidth: 600 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={profileData.avatar}
                  sx={{ width: 80, height: 80, mr: 3 }}
                />
                <Box>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="avatar-upload"
                    type="file"
                    onChange={handleAvatarUpload}
                  />
                  <label htmlFor="avatar-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<UploadIcon />}
                      sx={{ mr: 2 }}
                    >
                      Upload
                    </Button>
                  </label>
                  <IconButton
                    color="error"
                    onClick={() =>
                      setProfileData({ ...profileData, avatar: '' })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
                margin="normal"
                required
              />
              <Box sx={{ mt: 2 }}>
                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Box
              component="form"
              onSubmit={handlePasswordSubmit}
              sx={{ maxWidth: 600 }}
            >
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                margin="normal"
                required
              />
              <Box sx={{ mt: 2 }}>
                <Button type="submit" variant="contained">
                  Change Password
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            <Box sx={{ maxWidth: 600 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.email}
                    onChange={handleNotificationChange}
                    name="email"
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.sms}
                    onChange={handleNotificationChange}
                    name="sms"
                  />
                }
                label="SMS Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.push}
                    onChange={handleNotificationChange}
                    name="push"
                  />
                }
                label="Push Notifications"
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Notification Types
            </Typography>
            <Box sx={{ maxWidth: 600 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Parking reminders"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Payment receipts"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Special offers"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="System updates"
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {tabValue === 3 && (
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 600 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={paymentSettings.paymentMethod}
                  onChange={handlePaymentChange}
                  name="paymentMethod"
                  label="Payment Method"
                >
                  <MenuItem value="credit_card">Credit Card</MenuItem>
                  <MenuItem value="debit_card">Debit Card</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                </Select>
              </FormControl>

              {paymentSettings.paymentMethod !== 'paypal' && (
                <>
                  <TextField
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    value={paymentSettings.cardNumber}
                    onChange={handlePaymentChange}
                    margin="normal"
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={paymentSettings.expiryDate}
                      onChange={handlePaymentChange}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={paymentSettings.cvv}
                      onChange={handlePaymentChange}
                      margin="normal"
                    />
                  </Box>
                </>
              )}

              <Box sx={{ mt: 3 }}>
                <Button variant="contained">Save Payment Method</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Settings;