export default {
  mapError: (userMessage: string) => {
    if (userMessage.includes('TypeError:')) {
      return 'There is an issue in the client. This has been reported to admin staff'
    }

    return userMessage
  },
}
