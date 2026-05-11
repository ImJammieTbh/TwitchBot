function birthday(month, day) {
    const today = new Date();
    today.setHours(0,0,0,0);

    const bday = new Date(today.getFullYear(), month - 1, day);

    if (bday < today) {
        bday.setFullYear(today.getFullYear() + 1);
    }

    const days = Math.floor((bday - today) / 86400000);

    console.log(
        days === 0
            ? "Happy Birthday!"
            : `${days} days until your birthday`
    );
}