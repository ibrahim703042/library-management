const success = {
  // Read Operations (GET)
  ok: {
    statusCode: 200,
    message: 'Operation successful',
    code: 'OK',
  },

  // Create Operations (POST)
  created: {
    statusCode: 201,
    message: 'Resource created successfully',
    code: 'CREATED',
  },

  // Update Operations (PUT, PATCH)
  accepted: {
    statusCode: 202,
    message: 'Request accepted and will be processed',
    code: 'ACCEPTED',
  },

  noContent: {
    statusCode: 204,
    message: 'Resource updated successfully, no content to return',
    code: 'NO_CONTENT',
  },

  // Delete Operations (DELETE)
  deleted: {
    statusCode: 204,
    message: 'Resource deleted successfully, no content to return',
    code: 'NO_CONTENT',
  },

  // Authentication - Login
  loginSuccess: {
    statusCode: 200,
    message: 'Login successful',
    code: 'LOGIN_SUCCESS',
  },

  // Authentication - Logout
  logoutSuccess: {
    statusCode: 200,
    message: 'Logout successful',
    code: 'LOGOUT_SUCCESS',
  },

  // Authentication - Registration
  registrationSuccess: {
    statusCode: 201,
    message: 'Registration successful',
    code: 'REGISTRATION_SUCCESS',
  },

  // Authentication - Token Refresh
  tokenRefreshSuccess: {
    statusCode: 200,
    message: 'Token refreshed successfully',
    code: 'TOKEN_REFRESH_SUCCESS',
  },

  // Authentication - Password Reset Request
  passwordResetRequestSuccess: {
    statusCode: 200,
    message: 'Password reset request successful, check your email',
    code: 'PASSWORD_RESET_REQUEST_SUCCESS',
  },

  // Authentication - Password Reset Confirmation
  passwordResetSuccess: {
    statusCode: 200,
    message: 'Password reset successful',
    code: 'PASSWORD_RESET_SUCCESS',
  },

  // Authentication - Email Verification
  emailVerificationSuccess: {
    statusCode: 200,
    message: 'Email verified successfully',
    code: 'EMAIL_VERIFICATION_SUCCESS',
  },
};

export default success;
