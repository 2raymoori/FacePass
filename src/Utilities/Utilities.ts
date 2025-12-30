export const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    let minutes: number | String = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    const seconds = date.getSeconds();

    const dateString: string[] = date.toDateString().split(' ');

    return `${hours}:${minutes}^${dateString[0]}, ${dateString[2]} ${dateString[1]}`;
}

export const dayOrMorning = (time: string) => {
    let hours = Number(time.split(':')[0]);

    if (hours >= 5 && hours < 12) {
        return 'Good Morning';
    }
    else if (hours >= 12 && hours < 18) {
        return 'Good Afternoon';
    }
    else if (hours >= 18 && hours < 22) {
        return 'Good Evening';
    }
    return 'Good Night';
}