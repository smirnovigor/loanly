// Options
AccountsTemplates.configure({
    // defaultLayout: 'emptyLayout',
    showForgotPasswordLink: true,
    overrideLoginErrors: true,
    enablePasswordChange: true,

    // sendVerificationEmail: true,
    // enforceEmailVerification: true,
    //confirmPassword: true,
    //continuousValidation: false,
    //displayFormLabels: true,
    //forbidClientAccountCreation: true,
    //formValidationFeedback: true,
    //homeRoutePath: '/',
    //showAddRemoveServices: false,
    //showPlaceholders: true,
    //preSignUpHook: preSignUpHookFunk,

    negativeValidation: true,
    positiveValidation: true,
    negativeFeedback: false,
    positiveFeedback: true

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',
});

AccountsTemplates.addFields([
    {
        _id: "accountId",
        type: "text",
        displayName: "Account Id",
        required: true,
        minLength: 5
    },
    {
        _id: "file",
        type: "text",
        displayName: "Upload File",
        required: false
    },
    {
        _id: "username",
        type: "text",
        displayName: "username",
        required: true,
        minLength: 5
    }
]);

