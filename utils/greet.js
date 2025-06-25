const Greetings = () => {
    const now = new Date();
    const hours = now.getHours(); // returns hour in 24-hour format (0-23)

    let greeting = '';

    if (hours < 12) {
        greeting = 'Good Morning';
    } else if (hours < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }

    return greeting;
};

export default Greetings;