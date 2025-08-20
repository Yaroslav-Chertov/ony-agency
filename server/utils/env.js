const env = {
    ...process.env
}

// INFO: ENABLE FAKE API ONLY FOR TESTING
if (env.FAKE_API) {
    env.API_URL = env.FAKE_API;
    // env.BASE_URL = ''
}



export { env };