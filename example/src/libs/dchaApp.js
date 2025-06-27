const dchaApp = () => {
    const dcha_app = window.dcha_app || {};

    return {
        backHome: () => {
            if (!dcha_app || !dcha_app.backHome) {
                console.log("Calling dcha_app.backHome but not found");
                return;
            }
            dcha_app.backHome();
            console.log("dcha_app.backHome");
        },
    };
};

export default dchaApp();
