interface QuinyxAuthResponse {
  token: {
    tokenType: 'Bearer',
    accessToken: string,
    expiredIn: number,
    refreshToken: string,
    resetPassword: boolean,
  }
}

export default QuinyxAuthResponse;
