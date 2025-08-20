const testResponses = {
    EmailAlreadySubscribed: {
        status: 500,
        payload: {
            "success": false,
            "error": "EmailAlreadySubscribed",
            "message": "Этот Email уже подписан на рассылку"
        }
    },
    SuccessSubscribe: {
        status: 200,
        payload: {
            "success": true,
            "message": "Вы успешно подписались на рассылку"
        }
    },
    SendBriefSuccess: {
        status: 200,
        payload: {
            "responseText": "Success!",
        }
    },
    SendAbortError: {
        status: 404,
        payload: {

        }
    },
    SendConsultationSuccess: {
        status: 200,
        payload: {
            "responseText": "Success!",
        }
    }
}

export default testResponses;