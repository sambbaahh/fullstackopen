export const isNotNumber = (trainingDiary: Number[], target: number): boolean => {

    if (isNaN(target)) {
        throw new Error('Provided values were not numbers!');
    }

    trainingDiary.forEach((hours: number) => {
        if (isNaN(hours)) {
            throw new Error('Provided values were not numbers!');
        }
    });
    return true;
}

